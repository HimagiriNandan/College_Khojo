//React file imports
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

//components import
import Loading from "../Pages/Loading";

// slicers import
import { setBooks } from "../../Application/StateManagement/slices/BookSlice";

// css import
import "../Styles/Materials.css";

//api import
import { fetchBooksData } from "../../Application/Services/api";

//Materials Component
const Materials = () => {
  const dispatch = useDispatch();
  const { books, status, error } = useSelector((state) => state.books);

  const groupedBooks = books?.reduce((acc, book) => {
    const { category } = book;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(book);
    return acc;
  }, {});

  useEffect(() => {
    const fetchData = async () => {
      // const response2 = await fetchBooks();
      const response = await fetchBooksData();
      const bookdata = await response.data;
      dispatch(setBooks(bookdata||[])); // Fetch books when the component loads
    }
    fetchData();
  }, [dispatch]);

  return (
    <div className="gallery">
      {status === "loading" && <Loading />}
      {status === "failed" && <p>Error fetching books: {error}</p>}
      {status === "succeeded" && Object.keys(groupedBooks).length > 0 ? (
        Object.entries(groupedBooks).map(([category, books]) => (
          <BookSection key={category} category={category} books={books} />
        ))
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
};

//BookSection Component

const BookSection = ({ category, books = [] }) => {

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 300;
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 300;
    }
  };

  return (
    <div className="book-section">
      <h2>{category}</h2>
      <div className="scroll-container">
        <button className="arrow left" onClick={scrollLeft}>&#10094;</button>
        <div className="book-list" ref={scrollRef}>
          {books.length > 0 ? (
            books.map((book) => (
              <div className="book-card" key={book._id}>
                <img src={book.image} alt={book.title} />
                <p>{book.title}</p>
                <a href={book.driveLink} target="_blank" rel="noopener noreferrer">
                  <button className="download-btn">View/Download</button>
                </a>
              </div>
            ))
          ) : (
            <p>No books in this category.</p>
          )}
        </div>
        <button className="arrow right" onClick={scrollRight}>&#10095;</button>
      </div>
    </div>
  );
};

export default Materials;
