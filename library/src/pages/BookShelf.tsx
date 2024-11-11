import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SVGComponent from '../components/MySvg';
import './BookShelf.css';
import centroImage from '../assets/centro.png';
import izqImage from '../assets/esquinaizq.png';
import BookEditModal from '../components/BookEditModal';
import derImage from '../assets/esquinader.png';
import { Plus } from 'lucide-react';
const apiUrl = process.env.REACT_APP_API_URL;


interface Book {
    id: number;
    title: string;
    color: string;
}

const BookShelf: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([

    ]);
    const [newBook, setNewBook] = useState<string>("");
    const [selectedColor, setSelectedColor] = useState<string>("#FF5733");  // Color predeterminado
    const [editColor, setEditColor] = useState<string>("")
    const [editBook, setEditBook] = useState<string>("");
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedBookIndex, setSelectedBookIndex] = useState<number | null>(null);
    const [booksPerRow, setBooksPerRow] = useState<number>(4);
    const setSelectedAttributes = (book: Book, globalIndex: number) => {
        setSelectedBookIndex(globalIndex === selectedBookIndex ? null : globalIndex); 
        setEditColor(book.color)
    }

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/v1/books`);
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();

        const calculateBooksPerRow = () => {
            const bookWidth = 70;
            const containerWidth = document.querySelector('.books-container')?.clientWidth || 800;
            const calculatedBooksPerRow = Math.floor((containerWidth - 100) / bookWidth);
            setBooksPerRow(Math.max(1, calculatedBooksPerRow));
        };

        calculateBooksPerRow();
        window.addEventListener('resize', calculateBooksPerRow);
        return () => window.removeEventListener('resize', calculateBooksPerRow);
    }, []);

    const getBookRows = () => {
        const rows: Book[][] = [];
        for (let i = 0; i < books.length; i += booksPerRow) {
            rows.push(books.slice(i, i + booksPerRow));
        }
        return rows;
    };

    const handleAddBook = async () => {
        if (newBook.trim()) {
            const formattedBook = formatBookTitle(newBook);
            const newBookData = {
                title: formattedBook,
                color: selectedColor
            };
            
            try {
                const response = await fetch(`${apiUrl}/api/v1/books`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newBookData),
                });
                const data = await response.json();
                setBooks(prevBooks => [...prevBooks, data]);
                setNewBook("");
            } catch (error) {
                console.error('Error adding book:', error);
            }
        }
    };
    
    const formatBookTitle = (title: string) => {
        let formattedTitle = '';
        let charCount = 0;

        for (let i = 0; i < title.length; i++) {
            if (charCount === 7) {
                formattedTitle += ' ';
                charCount = 0;
            }
            if (title[i] === ' ') {
                charCount = 0;
            } else {
                charCount++;
            }
            formattedTitle += title[i];
        }

        return formattedTitle;
    };

    const unformatBookTitle = (formattedTitle: string) => {
        return formattedTitle.replace(/(\S{7}) /g, '$1');
    };

    const handleEditBook = async (index: number) => {
        const originalBook = unformatBookTitle(books[index].title);
        setEditBook(originalBook);
        setEditIndex(index);
        setShowModal(true);
    };

    const handleConfirmEdit = async () => {
        if (editIndex !== null && editBook.trim()) {
            const formattedBook = formatBookTitle(editBook);
            const updatedBookData = { title: formattedBook, color: editColor };

            try {
                const response = await fetch(`${apiUrl}/api/v1/books/${books[editIndex].id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedBookData),
                });
                const data = await response.json();
                setBooks(prevBooks =>
                    prevBooks.map((book, i) => (i === editIndex ? { ...book, title: formattedBook } : book))
                );
                setShowModal(false);
            } catch (error) {
                console.error('Error updating book:', error);
            }
        }
    };  

    const handleDeleteBook = async (index: number) => {
        try {
            const response = await fetch(`${apiUrl}/api/v1/books/${books[index].id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setBooks(prevBooks => prevBooks.filter((_, i) => i !== index));
                if (selectedBookIndex === index) setSelectedBookIndex(null);
            }
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <div className="container-fluid p-4 beige">
            <h1 className="text-center mb-4" style={{ fontFamily: "'Roboto', sans-serif" }}>
                Bienvenido a la librería de Alejandro
            </h1>

            <div className="d-flex justify-content-center mt-4 flex-wrap">
                <input
                    type="text"
                    value={newBook}
                    onChange={(e) => setNewBook(e.target.value)}
                    placeholder="Agregar nuevo libro"
                    className="me-2 p-3 w-50 shadow-sm rounded"
                    style={{ border: '2px solid #ccc', fontSize: '16px' }}
                />
                <div className="d-flex align-items-center me-2">
                    {['#003049', '#d62828', '#f77f00', '#fcbf49'].map((color) => (
                        <div
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            style={{
                                backgroundColor: color,
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                margin: '0 5px',
                                cursor: 'pointer',
                                border: selectedColor === color ? '3px solid #000' : 'none',
                            }}
                        />
                    ))}
                </div>
                <Button 
                    onClick={handleAddBook}
                    className="d-flex align-items-center justify-content-center p-3 w-auto shadow-sm rounded"
                    style={{ backgroundColor: '#4CAF50', border: 'none', fontSize: '16px' }}
                >
                    <Plus className="me-2" size={20} />
                    Agregar libro
                </Button>
            </div>

            <div className="books-container mx-auto" style={{ maxWidth: '1200px' }}>
                {getBookRows().map((row, rowIndex) => (
                    <div key={rowIndex} className="d-flex flex-row align-items-end justify-content-center mb-4 my-div" >
                        <img src={izqImage} alt="" className="img2" />
                        <div className="d-flex flex-row flex-nowrap">
                            {row.map((book, index) => {
                                const globalIndex = rowIndex * booksPerRow + index;
                                return (
                                    <div
                                        key={book.id}
                                        className={`d-flex flex-column ${index > 0 ? 'slided' : ''}`}
                                        onClick={() => setSelectedAttributes(book, globalIndex)}
                                    >
                                        <SVGComponent
                                            color={book.color}
                                            name={book.title}
                                            onEdit={() => handleEditBook(globalIndex)}
                                            onDelete={() => handleDeleteBook(globalIndex)}
                                            isSelected={selectedBookIndex === globalIndex}
                                        />
                                        <img src={centroImage} alt="" className="img" />
                                    </div>
                                );
                            })}
                        </div>
                        <img src={derImage} alt="" className="img2" />
                    </div>
                ))}
            </div>

            <BookEditModal
                show={showModal}
                onHide={() => setShowModal(false)}
                value={editBook}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEditBook(e.target.value)}
                onConfirm={handleConfirmEdit}
                color={editColor}
            />
        </div>
    );
};

export default BookShelf;