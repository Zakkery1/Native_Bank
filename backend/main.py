from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# uvicorn main:app  --reload --host 0.0.0.0 --port 8000
# fastapi dev main.py

app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/test")
async def read_root():
    return {"Name": "test", "Id": 123456, "AccountBalance": "1792363"}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
