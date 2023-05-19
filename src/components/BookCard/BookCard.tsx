import React from 'react';
import { Link } from 'react-router-dom';
import './BookCard.css';

interface BookCardProps {
  book: any;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <Link to={`/book/${book.id}`} className="book-card">
      <img
        src={book.volumeInfo.imageLinks?.thumbnail}
        alt={book.volumeInfo.title}
      />
      <h3>{book.volumeInfo.title}</h3>
      <p>
        <strong>Category:</strong>{' '}
        {book.volumeInfo.categories?.join(', ') || 'N/A'}
      </p>
      <p>
        <strong>Author(s):</strong>{' '}
        {book.volumeInfo.authors?.join(', ') || 'N/A'}
      </p>
    </Link>
  );
};

export default BookCard;
