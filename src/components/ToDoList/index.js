import React, { useState, useEffect } from "react";
import './index.css'

const ToDoList = () => {
    const [books, setBooks] = useState([])
    const [searchBook, setSearchBook] = useState('')
    const [hideBooks, setHideBooks] = useState(false)

    useEffect(() => {
        const storedBooks = localStorage.getItem('books')
        if (storedBooks) {
            setBooks(JSON.parse(storedBooks))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('books', JSON.stringify(books))
    }, [books])

    const filteredBooks = books.filter((book) => book.toLowerCase().includes(searchBook.toLowerCase()))

    const handleCheckboxChange = (event) => {
        setHideBooks(event.target.checked)
    }

    const addBook = (event) => {
        event.preventDefault()
        const newBook = event.target.elements.bookName.value.trim()
        if (newBook) {
            setBooks([...books, newBook])
            event.target.reset()
        }
    }

    const deleteBook = (bookToDelete) => {
        setBooks(books.filter((_, index) => index !== bookToDelete))
    }

    return (
        <div className="container">
            <div className="top">
                <h1>library</h1>
                <h2>Books for Students</h2>
                <input type="text" placeholder="Search Books..." value={searchBook} onChange={(e) => setSearchBook(e.target.value)} />
            </div>
            <div className="main">
                <h3>Books to Read</h3>
                {!hideBooks && (
                    <ul>
                        {filteredBooks.length > 0 ? (
                            filteredBooks.map((book, index) => (
                                <li key={index}>
                                    {book}
                                    <button onClick={() => deleteBook(index)}>Delete</button>
                                </li>
                            ))
                        ) : (
                            <li>No books added yet</li>
                        )}
                    </ul>
                )}
                </div>
                <div className="down">
                <div>
                    <input type="checkbox" id="hideBooksCheckbox" checked={hideBooks} onChange={handleCheckboxChange} />
                    <label htmlFor="hideBooksCheckbox">Hide All</label>
                </div>

                <form onSubmit={addBook}>
                    <input type="text" className="addInput" name="bookName" placeholder="Add a book" />
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    )
}

export default ToDoList