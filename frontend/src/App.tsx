import './App.css';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import BooksPage from './pages/BooksPage';
import BookDetailPage from './pages/BookDetailPage';
import AdminBooksPage from './pages/AdminBooksPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

function App() {
  return (
    <CartProvider>
      <Router>
        {/* Collapsible Bootstrap Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Book Store</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    <i className="bi bi-cart-fill me-1"></i> My Cart
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/book/:bookId" element={<BookDetailPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/cart/:title/:bookId" element={<CartPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path='/adminbooks' element={<AdminBooksPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;

