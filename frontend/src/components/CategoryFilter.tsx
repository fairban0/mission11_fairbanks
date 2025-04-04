import { useEffect, useState } from 'react';
import './CategoryFilter.css';

// Component lets the user filter books by category
function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  // State to hold the list of all available categories 
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch category list from the API when the component loads
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://localhost:5000/Book/GetBookCategories' // API to get book categories
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  // Handle when a checkbox is checked or unchecked
  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value) // Remove if already selected
      : [...selectedCategories, target.value]; // Add if not selected
    setSelectedCategories(updatedCategories); // Update parent state
  } 

  return (
    <div className="category-filter">
      <h5>Book Categories</h5>
      <div className="category-list">
         {/* Render checkboxes for each category */}
        {categories.map((c) => (
          <div key={c} className="category-item">
            <input
              type="checkbox"
              id={c}
              value={c}
              className="category-checkbox"
              onChange={handleCheckboxChange}
            />
            <label htmlFor={c}>{c}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
