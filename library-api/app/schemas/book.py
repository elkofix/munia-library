from pydantic import BaseModel

class Book(BaseModel):
    id: int
    title: str
    color: str

class BookCreate(BaseModel):
    title: str
    color: str
