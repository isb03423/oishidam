# KNU 한국어 감성사전

- 출처: https://github.com/park1200656/KnuSentiLex
- 원본: https://github.com/park1200656/KnuSentiLex/blob/c95a8a9bcb78ef92e3f8ddd277abaf31451d9f23/data/SentiWord_info.json
- 작성자: 온병원, 박상민, 나철원 / 군산대학교 Data Intelligence Lab
- `SentiWord_info.json`은 위 리비전의 원본 파일을 그대로 보관한다. 실행 중에는 다운로드하지 않는다.
- 극성: 매우 부정 `-2`, 부정 `-1`, 중립·미분류 `0`, 긍정 `1`, 매우 긍정 `2`.
- 원본의 중복 표제어는 마지막 항목을 사용한다. 로딩 후 긍정 표현 4,871개, 부정 표현 9,827개다.

폴백은 겹치지 않게 매칭된 긍정·부정 표현의 평균을 사용한다.
평균이 `1.5` 이상이면 `VERY_POSITIVE`, `0` 초과이면 `POSITIVE`,
`-1.5` 이하이면 `VERY_NEGATIVE`, `0` 미만이면 `NEGATIVE`다.
합계가 `0`이거나 긍정·부정 표현을 찾지 못하면 `NEUTRAL`이다.
`0` 항목은 평균에서 제외하지만, 긴 중립 구절 안의 짧은 표현이 따로 매칭되는 것을 막는다.
매우 긍정·부정 구분의 `±1.5`는 프로젝트의 초기 기준이며 리뷰 데이터로 검증된 기준이 아니다.
