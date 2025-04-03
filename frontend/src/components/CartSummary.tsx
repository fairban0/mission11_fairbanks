import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// Shows a fixed cart icon with the total price
// Clicking it takes the user to the cart page
const CartSummary = () => {
  const navigate =
    useNavigate();
  const { cart } = useCart();

  // Calculate the total price of all items in the cart
  const totalAmount =
    cart.reduce(
      (sum, item) =>
        sum + item.price,
      0
    );

  return (
    // Floating cart siummary in the top right corner
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '30px',
        background: '#f8f9fa',
        padding: '10px 18px',
        borderRadius: '12px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        boxShadow:
          '0 4px 10px rgba(0, 0, 0, 0.15)', 
        fontSize: '18px', 
        zIndex: 1050,
      }}
      onClick={() =>
        navigate('/cart')
      }
    >
      <i
        className="bi bi-cart-fill me-2"
        style={{
          fontSize: '24px',
          color: '#0d6efd',
        }}
      ></i>
      <strong>
        $
        {totalAmount.toFixed(
          2
        )}
      </strong>
    </div>
  );
};

export default CartSummary;
