from fastapi import FastAPI
from app.api.v1.api_v1 import router
from starlette.middleware.cors import CORSMiddleware



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://library-fronted.onrender.com"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)


app.include_router(router, prefix="/api/v1")
