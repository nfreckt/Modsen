import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';
import './BookDetailsPage.css';
import {useNavigate} from 'react-router-dom';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${id}?key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`
      );
      setBook(response.data);
    };
    fetchBookDetails();
  }, [id]);

  return (
    <div className="book-details">
  <button className="back-button" onClick={() => navigate(-1)}>
    Back
  </button>
  {book && (
    <div className="book-details-content">
      <div className="book-details-image">
        <img
          src={
            book.volumeInfo.imageLinks?.medium ||
            book.volumeInfo.imageLinks?.large
          }
          alt={book.volumeInfo.title}
        />
      </div>
      <div className="book-details-info">
        <h2>{book.volumeInfo.title}</h2>
        <p>
          <strong>Categories:</strong>{" "}
          {book.volumeInfo.categories?.join(", ") || "N/A"}
        </p>
        <p>
          <strong>Author(s):</strong>{" "}
          {book.volumeInfo.authors?.join(", ") || "N/A"}
        </p>
        <p>
          <strong>Description:</strong> {book.volumeInfo.description || "N/A"}
        </p>
      </div>
    </div>
  )}
</div>
  );
};

export default BookDetails;
