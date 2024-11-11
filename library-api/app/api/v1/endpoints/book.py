from fastapi import APIRouter
from typing import List
from app.schemas.book import Book, BookCreate
from app.services.book_service import BookService
from fastapi import APIRouter, HTTPException 
router = APIRouter()

book_service = BookService()
    
@router.get("/", response_model=List[Book])  # Ruta para obtener todos los libros
def get_books():
    return book_service.get_books()

@router.get("/{book_id}", response_model=Book)  # Ruta para obtener un libro por ID
def get_book(book_id: int):
    book = book_service.get_book(book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

@router.post("/", response_model=Book)  # Ruta para crear un libro
def create_book(book: BookCreate):
    return book_service.create_book(book)

@router.put("/{book_id}", response_model=Book)  # Ruta para actualizar un libro
def update_book(book_id: int, book: BookCreate):
    updated_book = book_service.update_book(book_id, book)
    if not updated_book:
        raise HTTPException(status_code=404, detail="Book not found")
    return updated_book

@router.delete("/{book_id}", response_model=Book)  # Ruta para eliminar un libro
def delete_book(book_id: int):
    deleted_book = book_service.delete_book(book_id)
    if not deleted_book:
        raise HTTPException(status_code=404, detail="Book not found")
    return deleted_book
