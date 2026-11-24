package com.oishidam.common.privacy;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.boot.sql.init.dependency.DependsOnDatabaseInitialization;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
@DependsOnDatabaseInitialization
public class PersonalDataMigration implements InitializingBean {
    private static final int BATCH_SIZE = 250;
    private static final String KEY_CHECK = "oishidam-personal-data-key-check";
    private static final List<String> DELIVERY_COLUMNS = List.of(
            "recipient_name", "recipient_phone", "postal_code", "address_line1", "address_line2", "customs_code"
    );

    private final JdbcTemplate jdbc;
    private final PersonalDataCrypto crypto;
    private final TransactionTemplate transaction;

    public PersonalDataMigration(JdbcTemplate jdbc, PersonalDataCrypto crypto, PlatformTransactionManager transactionManager) {
        this.jdbc = jdbc;
        this.crypto = crypto;
        transaction = new TransactionTemplate(transactionManager);
    }

    @Override
    public void afterPropertiesSet() {
        transaction.executeWithoutResult(status -> {
            jdbc.execute("SELECT pg_advisory_xact_lock(743865310327001)");
            jdbc.execute("""
                    CREATE TABLE IF NOT EXISTS personal_data_encryption (
                        singleton BOOLEAN PRIMARY KEY CHECK (singleton),
                        key_check TEXT NOT NULL
                    )
                    """);
            List<String> keyChecks = jdbc.queryForList("SELECT key_check FROM personal_data_encryption", String.class);
            String expectedKeyCheck = crypto.emailLookup(KEY_CHECK);
            boolean firstMigration = keyChecks.isEmpty();
            if (!firstMigration && !expectedKeyCheck.equals(crypto.decrypt(keyChecks.getFirst()))) {
                throw new IllegalStateException("개인정보 키 파일이 기존 데이터와 일치하지 않습니다.");
            }

            jdbc.execute("LOCK TABLE members, addresses, orders, email_verifications IN SHARE ROW EXCLUSIVE MODE");
            if (firstMigration) {
                // 컬럼 확장과 개인정보 암호화를 같은 트랜잭션에서 적용한다.
                jdbc.execute("""
                        ALTER TABLE members
                            ALTER COLUMN email TYPE TEXT,
                            ALTER COLUMN name TYPE TEXT,
                            ALTER COLUMN phone TYPE TEXT,
                            DROP CONSTRAINT IF EXISTS members_email_key,
                            ADD COLUMN IF NOT EXISTS email_lookup VARCHAR(72);
                        CREATE UNIQUE INDEX IF NOT EXISTS ux_members_email_lookup ON members (email_lookup);
                        ALTER TABLE addresses
                            ALTER COLUMN label TYPE TEXT,
                            ALTER COLUMN recipient_name TYPE TEXT,
                            ALTER COLUMN recipient_phone TYPE TEXT,
                            ALTER COLUMN postal_code TYPE TEXT,
                            ALTER COLUMN address_line1 TYPE TEXT,
                            ALTER COLUMN address_line2 TYPE TEXT,
                            ALTER COLUMN customs_code TYPE TEXT;
                        ALTER TABLE orders
                            ALTER COLUMN recipient_name TYPE TEXT,
                            ALTER COLUMN recipient_phone TYPE TEXT,
                            ALTER COLUMN postal_code TYPE TEXT,
                            ALTER COLUMN address_line1 TYPE TEXT,
                            ALTER COLUMN address_line2 TYPE TEXT,
                            ALTER COLUMN delivery_memo TYPE TEXT,
                            ALTER COLUMN customs_code TYPE TEXT;
                        """);
            }

            encryptRows("members", "member_id", List.of("email", "name", "phone"), firstMigration);
            encryptRows("addresses", "address_id", withColumn(DELIVERY_COLUMNS, "label"), firstMigration);
            encryptRows("orders", "order_id", withColumn(DELIVERY_COLUMNS, "delivery_memo"), firstMigration);
            migrateEmailVerifications(firstMigration);

            if (firstMigration) {
                jdbc.update("INSERT INTO personal_data_encryption (singleton, key_check) VALUES (TRUE, ?)",
                        crypto.encrypt(expectedKeyCheck));
            }
        });
    }

    private void encryptRows(String table, String idColumn, List<String> columns, boolean firstMigration) {
        String plaintext = columns.stream()
                .map(column -> "(" + column + " IS NOT NULL AND NOT starts_with(" + column + ", '"
                        + PersonalDataCrypto.CIPHERTEXT_PREFIX + "'))")
                .collect(Collectors.joining(" OR "));
        String assigns = columns.stream().map(column -> column + " = ?").collect(Collectors.joining(", "));
        boolean memberEmail = table.equals("members");
        if (memberEmail) assigns += ", email_lookup = ?";
        String select = "SELECT " + idColumn + ", " + String.join(", ", columns) + " FROM " + table
                + " WHERE (" + (firstMigration ? "TRUE" : plaintext) + ")";
        String update = "UPDATE " + table + " SET " + assigns + " WHERE " + idColumn + " = ?";

        Long lastId = null;
        while (true) {
            String nextPage = lastId == null ? "" : " AND " + idColumn + " > ?";
            String page = select + nextPage + " ORDER BY " + idColumn + " LIMIT " + BATCH_SIZE;
            List<MigrationRow> rows = jdbc.query(page, (rs, rowNum) -> {
                var values = new ArrayList<String>();
                for (String column : columns) values.add(rs.getString(column));
                return new MigrationRow(rs.getLong(idColumn), values);
            }, lastId == null ? new Object[0] : new Object[]{lastId});
            if (rows.isEmpty()) return;

            jdbc.batchUpdate(update, rows.stream().map(row -> {
                var parameters = new ArrayList<Object>();
                for (String value : row.values()) parameters.add(encryptLegacyValue(value, firstMigration));
                if (memberEmail) {
                    String email = row.values().getFirst();
                    parameters.add(crypto.emailLookup(isCiphertext(email, firstMigration) ? crypto.decrypt(email) : email));
                }
                parameters.add(row.id());
                return parameters.toArray();
            }).toList());
            lastId = rows.getLast().id();
        }
    }

    private void migrateEmailVerifications(boolean firstMigration) {
        String select = "SELECT email, purpose FROM email_verifications"
                + (firstMigration ? "" : " WHERE NOT starts_with(email, '" + PersonalDataCrypto.EMAIL_LOOKUP_PREFIX + "')");
        List<String[]> rows = jdbc.query(select, (rs, rowNum) -> new String[]{rs.getString("email"), rs.getString("purpose")});
        jdbc.batchUpdate("UPDATE email_verifications SET email = ? WHERE email = ? AND purpose = ?",
                rows.stream().map(row -> new Object[]{crypto.emailLookup(row[0]), row[0], row[1]}).toList());
    }

    private String encryptLegacyValue(String value, boolean firstMigration) {
        return isCiphertext(value, firstMigration) ? value : crypto.encrypt(value);
    }

    private boolean isCiphertext(String value, boolean firstMigration) {
        return !firstMigration && value != null && value.startsWith(PersonalDataCrypto.CIPHERTEXT_PREFIX);
    }

    private static List<String> withColumn(List<String> columns, String additionalColumn) {
        var result = new ArrayList<>(columns);
        result.add(additionalColumn);
        return result;
    }

    private record MigrationRow(long id, List<String> values) {}
}
