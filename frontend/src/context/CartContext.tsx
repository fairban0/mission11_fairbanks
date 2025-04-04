import { createContext, ReactNode, useContext, useState } from 'react';
import { CartItem } from '../types/CartItem';

// Define the shape of the cart context
interface CartContextType {
  cart: CartItem[]; // List of items in the cart
  addToCart: (item: CartItem) => void; // Function to add an item to the cart
  removeFromCart: (bookId: number) => void; // Function to remove one quantity of an item
  clearCart: () => void; // Function to clear the cart
}

// Create the context (initially undefined until set)
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider wraps the app and gives access to cart functions and data
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]); // Cart state

  // Add a book to the cart or update quantity if it already exists
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.bookId === item.bookId);

      if (existingItem) {
        // If item already exists, increase its quantity
        return prevCart.map((c) =>
          c.bookId === item.bookId
            ? { ...c, quantity: c.quantity + item.quantity }
            : c
        );
      }

      // If new item, add it to the cart
      return [...prevCart, item];
    });
  };

  // Remove one quantity of a book from the cart
  const removeFromCart = (bookId: number) => {
    setCart((prevCart) =>
      prevCart
        .map((c) =>
          c.bookId === bookId ? { ...c, quantity: c.quantity - 1 } : c
        )
        .filter((c) => c.quantity > 0) // Only keep items with quantity > 0
    );
  };

  // Completely clear the cart
  const clearCart = () => {
    setCart(() => []);
  };

  // Provide cart data and actions to any component inside the provider
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use the cart in other components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

