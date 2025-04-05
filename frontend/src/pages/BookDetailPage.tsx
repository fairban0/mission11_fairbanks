import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { Book } from '../types/bookService';

function BookDetailPage() {
  const { bookId } = useParams(); // Get the bookId from the URL
  const navigate = useNavigate(); // Used to navigate between pages
  const { addToCart } = useCart(); // Access addToCart function from context

  const [book, setBook] = useState<Book | null>(null); // Book details
  const [quantity, setQuantity] = useState<number>(1); // Quantity selected by user
  const [showToast, setShowToast] = useState(false); // Controls whether toast is visible

  // Fetch the book from the API when the component loads
  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch(`https://mission11-fairbanks-backend-bvgxasa6bfb0hwd2.eastus-01.azurewebsites.net/book/${bookId}`);
      if (res.ok) {
        const data = await res.json();
        setBook(data); // Store book info in state
      } else {
        console.error('Book not found.');
      }
    };

    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  // Function to add the book to the cart
  const handleAddToCart = () => {
    if (!book) return;

    const newItem: CartItem = {
      bookId: book.bookID,
      title: book.title,
      price: Number(book.price),
      quantity: quantity,
    };

    addToCart(newItem); // Add item to cart

    // Show the toast message
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000); // Hide toast after 2 seconds
  };

  // Show loading message while book data is being fetched
  if (!book) return <div>Loading book info...</div>;

  return (
    <>
      <WelcomeBand />
      <h2>{book.title}</h2>

      {/* Book Details */}
      <ul>
        <li><strong>Author:</strong> {book.author}</li>
        <li><strong>Publisher:</strong> {book.publisher}</li>
        <li><strong>ISBN:</strong> {book.isbn}</li>
        <li><strong>Classification:</strong> {book.classification}</li>
        <li><strong>Category:</strong> {book.category}</li>
        <li><strong>Pages:</strong> {book.pageCount}</li>
        <li><strong>Price:</strong> ${book.price}</li>
      </ul>

      {/* Quantity Selector and Add to Cart Button */}
      <div>
        <label>
          Quantity:
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(x) => setQuantity(Number(x.target.value))}
          />
        </label>
        <br />
        <button className="btn btn-success mt-2" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>

      {/* Back Button */}
      <button className="btn btn-secondary mt-2" onClick={() => navigate(-1)}>
        Go Back
      </button>

      {/* Toast message when item is added to cart */}
      {showToast && (
        <div
          className="position-fixed top-50 start-50 translate-middle bg-success text-white rounded shadow p-3"
          style={{ zIndex: 1055 }}
        >
          ✅ Added to cart successfully!
        </div>
      )}
    </>
  );
}

export default BookDetailPage;

