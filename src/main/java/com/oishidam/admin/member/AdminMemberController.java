package com.oishidam.admin.member;

import com.oishidam.admin.member.dto.AdminMemberStatusResponse;
import com.oishidam.common.dto.ApiResponse;
import com.oishidam.common.exception.ApiException;
import com.oishidam.common.privacy.PrivateSearch;
import com.oishidam.member.entity.Member;
import com.oishidam.member.repository.MemberRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Locale;
import java.util.function.Function;
import java.util.stream.Collectors;

@Tag(name = "관리자 - 회원", description = "회원 조회 및 이용 상태 관리")
@RestController
@RequestMapping("/api/admin/members")
@RequiredArgsConstructor
public class AdminMemberController {
    private final MemberRepository members;

    private final AdminMemberService service;

    public record Summary(
            Long memberId,
            String name,
            String email,
            String role,
            boolean isActive,
            LocalDateTime createdAt
    ) {
    }

    public record Detail(
            Long memberId,
            String name,
            String email,
            String phone,
            Integer birthYear,
            String gender,
            String role,
            boolean isActive,
            LocalDateTime createdAt
    ) {
    }

    public record StatusRequest(@NotNull Boolean isActive) {
    }
    @Operation(summary = "회원 목록 조회")
    @GetMapping
    @Transactional(readOnly = true, isolation = Isolation.REPEATABLE_READ)
    public ApiResponse<Page<Summary>> list(
            @RequestParam(required = false) String keyword, @RequestParam(required = false) Boolean isActive,
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size
    ) {
        if (page < 0 || size < 1 || size > 100) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PAGINATION", "페이지 번호 또는 크기가 올바르지 않습니다.");
        }
        String search = keyword == null ? "" : keyword.trim().toLowerCase(Locale.ROOT);
        Specification<Member> filter = (root, query, cb) -> isActive == null
                ? cb.conjunction() : cb.equal(root.get("isActive"), isActive);
        var pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
        Page<Member> result;
        if (search.isEmpty()) {
            result = members.findAll(filter, pageable);
        } else {
            Page<Long> matches = members.findBy(filter, query -> PrivateSearch.page(
                    query.as(MemberRepository.SearchFields.class).sortBy(pageable.getSort()).stream()
                            .filter(member -> PrivateSearch.contains(member.getName(), search)
                                    || PrivateSearch.contains(member.getEmail(), search))
                            .map(MemberRepository.SearchFields::getId), pageable));
            var byId = members.findAllById(matches.getContent()).stream()
                    .collect(Collectors.toMap(Member::getId, Function.identity()));
            result = matches.map(byId::get);
        }
        return ApiResponse.ok(result.map(m ->
                new Summary(m.getId(), m.getName(), m.getEmail(), m.getRole().name(), m.isActive(), m.getCreatedAt())));
    }
    @Operation(summary = "회원 상세 조회")
    @GetMapping("/{memberId}")
    @Transactional(readOnly = true)
    public ApiResponse<Detail> detail(@PathVariable Long memberId) {
        Member m = members.findById(memberId).orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "MEMBER_NOT_FOUND", "회원을 찾을 수 없습니다."));
        return ApiResponse.ok(new Detail(
                m.getId(), m.getName(), m.getEmail(), m.getPhone(), m.getBirthYear(),
                m.getGender() == null ? null : m.getGender().name(), m.getRole().name(), m.isActive(), m.getCreatedAt()
        ));
    }
    @Operation(summary = "회원 이용 상태 변경")
    @PatchMapping("/{memberId}/status")
    public ApiResponse<AdminMemberStatusResponse> changeStatus(@PathVariable Long memberId, @Valid @RequestBody StatusRequest request) {
        return ApiResponse.ok(service.changeStatus(memberId, request.isActive()));
    }
}
