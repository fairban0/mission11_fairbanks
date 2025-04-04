import {
  useEffect,
  useState,
} from 'react';
import { Book } from '../types/bookService';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/BookAPI';
import Pagination from './Pagination';

// Components to display a list of books with pagination and filtering
function BookList({
  selectedCategories,
}: {
  selectedCategories: string[];
}) {
  const [books, setBooks] =
    useState<Book[]>([]);
  const [
    pageSize,
    setPageSize,
  ] = useState<number>(10);
  const [
    pageNum,
    setPageNum,
  ] = useState<number>(1);
  const [
    totalPages,
    setTotalPages,
  ] = useState<number>(0);
  const navigate =
    useNavigate();
  const [error, setError] =
    useState<string | null>(
      null
    );
  const [
    loading,
    setLoading,
  ] = useState(true);

  // Fetch books from API whenever filters or pagination changes
  useEffect(() => {
    const loadBooks =
      async () => {
        try {
          setLoading(true);
          const data =
            await fetchBooks(
              pageSize,
              pageNum,
              selectedCategories
            );
          setBooks(
            data.books
          );
          setTotalPages(
            Math.ceil(
              data.totalNumBooks /
                pageSize
            )
          );
        } catch (error) {
          setError(
            (error as Error)
              .message
          );
        } finally {
          setLoading(false);
        }
      };

    loadBooks();
  }, [
    pageSize,
    pageNum,
    selectedCategories,
  ]);

  if (loading)
    return (
      <p>Loading books...</p>
    );
  if (error)
    return (
      <p className="text-red-500">
        Error: {error}
      </p>
    );

  return (
    <>
      {books.map((b) => (
        <div
          id="projectCard"
          className="card"
          key={b.bookID}
        >
          <h3 className="card-title">
            {b.title}
          </h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>
                  Author:{' '}
                </strong>
                {b.author}
              </li>
              <li>
                <strong>
                  Publisher:{' '}
                </strong>
                {b.publisher}
              </li>
              <li>
                <strong>
                  ISBN:{' '}
                </strong>
                {b.isbn}
              </li>
              <li>
                <strong>
                  Classification:{' '}
                </strong>
                {
                  b.classification
                }
              </li>
              <li>
                <strong>
                  Category:{' '}
                </strong>
                {b.category}
              </li>
              <li>
                <strong>
                  Price:{' '}
                </strong>
                {b.price}
              </li>
              <li>
                <strong>
                  Price:{' '}
                </strong>
                {b.price}
              </li>
            </ul>

            <button
              className="btn btn-success"
              onClick={() =>
                navigate(
                  `/book/${b.bookID}`
                )
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}

      <Pagination
        currentPage={pageNum}
        totalPages={
          totalPages
        }
        pageSize={pageSize}
        onPageChange={
          setPageNum
        }
        onPageSizeChange={(
          newSize
        ) => {
          setPageSize(
            newSize
          );
          setPageNum(1);
        }}
      />
    </>
  );
}

export default BookList;
