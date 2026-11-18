import base64
import io
import os

import matplotlib
import matplotlib.pyplot as plt
import seaborn as sns

from config import get_settings

matplotlib.use("Agg")
setting = get_settings()
sns.set_theme(style="whitegrid")

# 한글 폰트 사용 설정
for _font in ["NanumGothic", "Malgun Gothic", "AppleGothic", "NanumBarunGothic"]:
    if any(_font.lower() in f.name.lower() for f in matplotlib.font_manager.fontManager.ttflist):
        plt.rcParams["font.family"] = _font
        break

plt.rcParams["axes.unicode_minus"] = False

def save_and_encode(fig, filename: str) -> dict:
    """차트를 파일로 저장하고 base64 문자열도 함께 돌려준다."""
    os.makedirs(setting.CHART_DIR, exist_ok=True)
    path = os.path.join(setting.CHART_DIR, filename)
    fig.tight_layout()
    fig.savefig(path, dpi=110)
    
    buf = io.BytesIO()
    fig.savefig(buf, format="png", dpi=110)
    plt.close(fig)
    buf.seek(0)
    return {
        "file": path,
        "image_base64": f"data:image/png;base64, {base64.b64encode(buf.read()).decode()}",
    }
