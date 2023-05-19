import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';
import './BookList.css';

interface BookListProps {
  searchQuery: string;
  category: string;
  sort: string;
}

const BookList: React.FC<BookListProps> = ({ searchQuery, category, sort }) => {
  const [books, setBooks] = useState<any[]>([]);
  const [startIndex, setStartIndex] = useState(30);
  const [totalItems, setTotalItems] = useState(0);
  const [searchResultCount, setSearchResultCount] = useState<number | null>(null);

  useEffect(() => {
    setBooks([]);
    setSearchResultCount(null);
    if (searchQuery) {
      const fetchBooks = async () => {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}${
            category !== 'all' ? `+subject:${category}` : ''
          }&orderBy=${sort}&startIndex=0&maxResults=30&key=${
            process.env.REACT_APP_GOOGLE_BOOKS_API_KEY
          }`
        );
        setTotalItems(response.data.totalItems);
        setSearchResultCount(response.data.totalItems);
        if (response.data.items) {
          setBooks(response.data.items);
          setStartIndex(30); // Update startIndex after the first search
        } else {
          setBooks([]);
        }
      };
  
      fetchBooks();
    }
  }, [searchQuery, category, sort]);

  const loadMoreBooks = async () => {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}${
        category !== 'all' ? `+subject:${category}` : ''
      }&orderBy=${sort}&startIndex=${startIndex}&maxResults=30&key=${
        process.env.REACT_APP_GOOGLE_BOOKS_API_KEY
      }`
    );
  
    if (response.data.items) {
      const newBooks = response.data.items.filter(
        (newBook: any) => !books.some((book: any) => book.id === newBook.id)
      );
  
      setBooks((prevBooks) => [...prevBooks, ...newBooks]);
      setStartIndex((prevStartIndex) => prevStartIndex + 30);
    }
  };

  return (
    <div className="book-list">
      <div className="book-list-counter">
      {searchResultCount !== null && (
        <p className="search-result-count">
          {searchResultCount} books found
        </p>
      )}
      </div>
      <div className="book-list-elem">
      {books.length === 0 ? (
        <p className='no-search'>No search result</p>
      ) : (
        books.map((book: any) => <BookCard key={book.id} book={book} />)
      )}
      </div>
      <div className='book-load-more'>
      {searchQuery && books.length > 0 && books.length < totalItems && (
        <button onClick={loadMoreBooks} className="load-more">
          Load More
        </button>
      )}
      </div>
    </div>
  );
};

export default BookList;
