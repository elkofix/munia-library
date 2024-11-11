
import json
from typing import List, Optional
from app.schemas.book import Book, BookCreate

class BookService:
    def __init__(self):
        self.db_path = "app/db/books.json"

    def _read_db(self) -> List[Book]:
        with open(self.db_path, "r") as file:
            return json.load(file)

    def _write_db(self, books: List[Book]):
        with open(self.db_path, "w") as file:
            json.dump(books, file, indent=4)

    def get_books(self) -> List[Book]:
        return self._read_db()

    def get_book(self, book_id: int) -> Optional[Book]:
        books = self._read_db()
        for book in books:
            if book["id"] == book_id:
                return book
        return None

    def create_book(self, book: BookCreate) -> Book:
        books = self._read_db()
        new_book = Book(id=len(books) + 1, **book.dict())
        books.append(new_book.dict())
        self._write_db(books)
        return new_book

    def update_book(self, book_id: int, book: BookCreate) -> Optional[Book]:
        books = self._read_db()
        for idx, existing_book in enumerate(books):
            if existing_book["id"] == book_id:
                books[idx]["title"] = book.title
                books[idx]["color"] = book.color
                self._write_db(books)
                return Book(**books[idx])
        return None

    def delete_book(self, book_id: int) -> Optional[Book]:
        books = self._read_db()
        for idx, existing_book in enumerate(books):
            if existing_book["id"] == book_id:
                deleted_book = books.pop(idx)
                self._write_db(books)
                return Book(**deleted_book)
        return None
