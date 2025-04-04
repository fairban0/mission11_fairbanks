import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

// This page displays the user's cart with quantity controls
function CartPage() {
  const navigate =
    useNavigate(); // Used to navigate to other pages
  const {
    cart,
    addToCart,
    removeFromCart,
  } = useCart(); // Access cart and functions from context

  // Calculate the total cost of all items in the cart
  const cartTotal =
    cart.reduce(
      (sum, item) =>
        sum +
        item.price *
          item.quantity,
      0
    );

  return (
    <div>
      <h2>Your cart</h2>

      <div>
        {/* Show message if the cart is empty */}
        {cart.length === 0 ? (
          <p>
            Your cart is
            empty.
          </p>
        ) : (
          <ul>
            {/* List all items in the cart */}
            {cart.map(
              (
                item: CartItem
              ) => (
                <li
                  key={
                    item.bookId
                  }
                  style={{
                    marginBottom:
                      '1rem',
                  }}
                >
                  <strong>
                    {
                      item.title
                    }
                  </strong>
                  <br />
                  Quantity:{' '}
                  {
                    item.quantity
                  }
                  <br />
                  Price per
                  item: $
                  {item.price.toFixed(
                    2
                  )}
                  <br />
                  Total: $
                  {(
                    item.price *
                    item.quantity
                  ).toFixed(
                    2
                  )}
                  <br />
                  {/* Button to decrease quantity */}
                  <button
                    onClick={() =>
                      removeFromCart(
                        item.bookId
                      )
                    }
                  >
                    -
                  </button>
                  {/* Button to increase quantity */}
                  <button
                    onClick={() =>
                      addToCart(
                        {
                          ...item,
                          quantity: 1,
                        }
                      )
                    }
                  >
                    +
                  </button>
                </li>
              )
            )}
          </ul>
        )}
      </div>

      {/* Show overall total */}
      <h3>
        Total: $
        {cartTotal.toFixed(2)}
      </h3>

      {/* Checkout and continue browsing buttons */}
      <button>
        Checkout
      </button>
      <button
        onClick={() =>
          navigate('/')
        }
      >
        Continue Browsing
      </button>
    </div>
  );
}

export default CartPage;
