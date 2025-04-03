import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import WelcomeBand from '../components/WelcomeBand';
import CartSummary from '../components/CartSummary';
import BookList from '../components/bookList';

// This is the main page that shows all the books and filters
function BooksPage() {
  // State to keep track of the categories the user selects
  const [
    selectedCategories,
    setSelectedCategories,
  ] = useState<string[]>([]);

  return (
    // Bootstrap container with margin-top
    <div className="container mt-4">
      {/* Floating cart icon and total */}
      <CartSummary />

      {/* Welcome banner at the top */}
      <WelcomeBand />

      <div className="row">
        {/* Category filters on the left (takes up 3/12 columns) */}
        <div className="col-md-3">
          <CategoryFilter
            selectedCategories={
              selectedCategories
            }
            setSelectedCategories={
              setSelectedCategories
            }
          />
        </div>

        {/* Book list on the right (takes up 9/12 columns) */}
        <div className="col-md-9">
          <BookList
            selectedCategories={
              selectedCategories
            }
          />
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
