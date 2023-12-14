import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookRepository.css'; 

function BookRepository() {
    const [books, setBooks] = useState([]);
    const [query, setQuery] = useState('');
    const [textToSpeechText, setTextToSpeechText] = useState('');
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        if (query.trim() === '') {
            setBooks([]);
            setSelectedBook(null); 
            return;
        }

        const apiKey = 'AIzaSyBa4L_Y3wSJkZilDbHcyVaRNaRauQV_WHw';
        const endpoint = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${apiKey}`;

        axios
            .get(endpoint)
            .then((response) => {
                setBooks(response.data.items);
            })
            .catch((error) => {
                console.error('Error fetching book data:', error);
            });
    }, [query]);

    const speakText = (text) => {
        if (text) {
            const speechSynthesis = window.speechSynthesis;
            const speechText = new SpeechSynthesisUtterance(text);
            speechSynthesis.speak(speechText);
        }
    };

    const handleBookClick = (bookTitle) => {
        setSelectedBook(bookTitle);
        speakText(bookTitle);
    };

    return (
        <div className="box">
        <div className="book-repo-container">
            <h1 className='header'>Smart Education Library</h1>
            <div className="search-bar">
                <input type="text" placeholder="Search for books..." value={query} onChange={(e) => setQuery(e.target.value)} />
                {/* <button onClick={() => speakText(textToSpeechText)}>
                    <span role="img" aria-label="Microphone">🎤 </span>Speak Text
                </button> */}

            </div>
            {query.trim() === '' && <p className="empty-query-message">Please enter a search query to search.</p>}
            {books.length === 0 && query.trim() !== '' && <p className="no-results-message">No results found.</p>}
            <ul className="book-list">
                {books.map((book, index) => (
                    <li key={index} className={`book-item ${selectedBook === book.volumeInfo.title ? 'selected' : ''}`}>
                        {book.volumeInfo.imageLinks && (
                            <img
                                className="book-cover"
                                src={book.volumeInfo.imageLinks.thumbnail}
                                alt={`Cover for ${book.volumeInfo.title}`}
                            />
                        )}
                        <div className="book-details" onClick={() => handleBookClick(book.volumeInfo.title)}>
                            <h2 className="book-title">{book.volumeInfo.title}</h2>
                            <p className="book-author">Author: {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
                            <p className="book-published">Published Date: {book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : 'Unknown'}</p>
                            {book.volumeInfo.previewLink && (
                                <a className="book-preview-link" href={book.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">Preview Book</a>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
}

export default BookRepository;
