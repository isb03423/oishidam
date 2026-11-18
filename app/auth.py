import json
import re
from dataclasses import dataclass
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from fastapi import Depends, HTTPException, Request as FastAPIRequest
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from config import get_settings

bearer = HTTPBearer(auto_error=False)


@dataclass(frozen=True)
class CurrentMember:
    member_id: int
    role: str


def current_member(credentials: HTTPAuthorizationCredentials | None = Depends(bearer)) -> CurrentMember:
    """매 요청의 JWT를 Spring Boot에서 검증하고 현재 회원 권한을 가져온다."""
    if credentials is None:
        raise HTTPException(401, "로그인이 필요합니다.", headers={"WWW-Authenticate": "Bearer"})
    request = Request(
        get_settings().SPRING_API_URL + "/members/me",
        headers={"Authorization": "Bearer " + credentials.credentials},
    )
    try:
        with urlopen(request, timeout=3) as response:
            member = json.load(response)["data"]
            member_id = member["memberId"]
            role = {"USER": "USER", "일반 회원": "USER", "ADMIN": "ADMIN", "관리자": "ADMIN"}.get(member["role"])
        if type(member_id) is not int or member_id < 1 or role is None:
            raise ValueError("Invalid member response")
    except HTTPError as error:
        if error.code == 401:
            raise HTTPException(401, "다시 로그인해주세요.", headers={"WWW-Authenticate": "Bearer"}) from None
        if error.code == 403:
            raise HTTPException(403, "접근 권한이 없습니다.") from None
        raise HTTPException(503, "로그인 정보를 확인할 수 없습니다.") from None
    except (URLError, TimeoutError, OSError, ValueError, KeyError, TypeError):
        raise HTTPException(503, "로그인 정보를 확인할 수 없습니다.") from None
    return CurrentMember(member_id, role)


def authorize_request(request: FastAPIRequest, member: CurrentMember = Depends(current_member)) -> None:
    """추천과 본인 후기 단건 분석 외에는 관리자로 제한한다."""
    recommendation = request.url.path == "/api/ai/recommend/products" and request.method in ("GET", "POST")
    own_review = request.method == "POST" and re.fullmatch(
        r"/api/ai/sentiment/reviews/[1-9][0-9]*/analyze", request.url.path
    )
    if not recommendation and not own_review and member.role != "ADMIN":
        raise HTTPException(403, "관리자만 이용할 수 있습니다.")
