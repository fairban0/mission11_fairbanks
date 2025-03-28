import { useEffect, useState } from 'react';
import { Book } from './types/bookService';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortBy, setSortBy] = useState('title');
  const [ascending, setAscending] = useState(true);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // ✅ Sanitize sortBy input
        const safeSortBy = ['title', 'author', 'price'].includes(sortBy.toLowerCase())
          ? sortBy
          : 'title';

        const url = `https://localhost:5000/Book/BooksPaged?page=${page}&pageSize=${pageSize}&sortBy=${safeSortBy}&ascending=${ascending}`;
        console.log('Fetching from API:', url);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setBooks(data.books);
        setTotalItems(data.totalItems);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };

    fetchBooks();
  }, [page, pageSize, sortBy, ascending]);

  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="container mt-4">
      <h1>📚 Book Store</h1>

      {/* Sorting & Page Size Controls */}
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <div>
          <label className="me-2">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="form-select d-inline w-auto me-2"
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="price">Price</option>
          </select>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setAscending(!ascending)}
          >
            {ascending ? '↑ Ascending' : '↓ Descending'}
          </button>
        </div>

        <div>
          <label className="me-2">Books per page:</label>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="form-select d-inline w-auto"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {/* Book Cards */}
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
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <button
          className="btn btn-outline-primary"
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        <span>Page {page} of {totalPages}</span>

        <button
          className="btn btn-outline-primary"
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default BookList;


