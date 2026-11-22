package com.oishidam.common.privacy;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.stream.Stream;

public final class PrivateSearch {
    private PrivateSearch() {}

    public static boolean contains(String value, String search) {
        return value != null && value.toLowerCase(Locale.ROOT).contains(search);
    }

    public static <T> Page<T> page(Stream<T> matches, Pageable pageable) {
        List<T> content = new ArrayList<>(pageable.getPageSize());
        long total = 0;
        try (matches) {
            var iterator = matches.iterator();
            while (iterator.hasNext()) {
                T match = iterator.next();
                if (total >= pageable.getOffset() && content.size() < pageable.getPageSize()) {
                    content.add(match);
                }
                total++;
            }
        }
        return new PageImpl<>(content, pageable, total);
    }
}
