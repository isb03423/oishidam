import logging

from fastapi import Depends, FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from config import get_settings
from auth import authorize_request
from routers import customers, recommend, sentiment

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s - %(message)s")

app = FastAPI(
    title="오이시담(Oishidam) AI Service",
    description="오이시담(Oishidam) 쇼핑몰 프로젝트의 추천 · 감정분석 · 데이터분석",
    version="1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=get_settings().FRONTEND_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recommend.router, dependencies=[Depends(authorize_request)])
app.include_router(sentiment.router, dependencies=[Depends(authorize_request)])
app.include_router(customers.router, dependencies=[Depends(authorize_request)])


@app.get("/health")
def health():
    return {"status": "Running"}

@app.exception_handler(Exception)
async def unhandled(request, exc):
    logging.exception("AI 서비스 오류")
    return JSONResponse(status_code=500, content={"detail": str(exc)})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
