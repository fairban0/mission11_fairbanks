import { useEffect, useState } from 'react';
import { Book } from '../types/bookService';
import { useNavigate } from 'react-router-dom';

// Components to display a list of books with pagination and filtering
function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();

  // Fetch books from API whenever filters or pagination changes
  useEffect(() => {
    const fetchProjects = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `category=${encodeURIComponent(cat)}`)
        .join('&');

        // Fetch books from backend API
      const response = await fetch(
        `https://localhost:5000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
      );
      const data = await response.json();
      // Update state with book data
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);

      // Calculate total number of pages
      setTotalPages(Math.ceil(totalItems / pageSize));
    };

    fetchProjects();
  }, [pageSize, pageNum, totalItems, selectedCategories]);

  return (
    <>
      {/* Render each book as a card */}
      {books.map((b) => (
        <div
          key={b.bookID}
          className="card mb-3"
          style={{ border: '1px solid #ccc', padding: '1rem' }}
        >
          <h4>{b.title}</h4>
          <ul>
            <li><strong>Author:</strong> {b.author}</li>
            <li><strong>Publisher:</strong> {b.publisher}</li>
            <li><strong>ISBN:</strong> {b.isbn}</li>
            <li><strong>Classification:</strong> {b.classification}</li>
            <li><strong>Category:</strong> {b.category}</li>
            <li><strong>Pages:</strong> {b.pageCount}</li>
            <li><strong>Price:</strong> ${b.price}</li>
          </ul>
          <button
              className="btn btn-success"
              onClick={() =>
                navigate(`/book/${b.bookID}`)
              }
            >
              Add to Cart
            </button>
          </div>
      ))}

      {/* Paginatoin Controls */}
      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => setPageNum(i + 1)}
          disabled={pageNum === i + 1}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

       {/* Dropdown to choose number of results per page */}
      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default BookList;