from fastapi import APIRouter
from app.api.v1.endpoints import book

router = APIRouter()

router.include_router(book.router, prefix="/books", tags=["books"])
