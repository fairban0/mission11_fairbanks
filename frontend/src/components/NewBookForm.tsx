import { useState } from 'react';
import { Book } from '../types/bookService';
import { addBook } from '../api/BookAPI';

// Props for the NewBookForm component
interface NewBookFormProps {
  onSuccess: () => void; // Called when book is sucessfully added
  onCancel: () => void; // Called when the user cancels the form
}

// Main form component to create a new book entry
const NewBookForm = ({
  onSuccess,
  onCancel,
}: NewBookFormProps) => {
  // Initialize form state with empty book data
  const [
    formData,
    setFormData,
  ] = useState<Book>({
    bookID: 0,
    title: '',
    author: '',
    publisher: '',
    isbn: 0,
    classification: '',
    category: '',
    pageCount: '',
    price: '',
  });

  // Handle user input in text/number fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value, // Update appropriate field
    });
  };

  // Handle form submission
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault(); // Prevent default page reload
    await addBook(formData); // Call API to add book
    onSuccess(); // Notify parent component
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      <h2>Add New Book</h2>
      {/* Title input */}
      <label>
        Book Title:
        <input
          type="text"
          name="title"
          value={
            formData.title
          }
          onChange={
            handleChange
          }
        />
      </label>
      {/* Author input */}
      <label>
        Author:
        <input
          type="text"
          name="author"
          value={
            formData.author
          }
          onChange={
            handleChange
          }
        />
      </label>
      {/* Publisher input */}
      <label>
        Publisher:
        <input
          type="text"
          name="publisher"
          value={
            formData.publisher
          }
          onChange={
            handleChange
          }
        />
      </label>
      {/* ISBN input */}
      <label>
        ISBN:
        <input
          type="string"
          name="isbn"
          value={
            formData.isbn
          }
          onChange={
            handleChange
          }
        />
      </label>
      {/* Classification input */}
      <label>
        Classification:
        <input
          type="text"
          name="classification"
          value={
            formData.classification
          }
          onChange={
            handleChange
          }
        />
      </label>
      {/* Category input */}
      <label>
        Category:
        <input
          type="text"
          name="category"
          value={
            formData.category
          }
          onChange={
            handleChange
          }
        />
      </label>
      {/* Page Count input */}
      <label>
        Page Count:
        <input
          type="text"
          name="pageCount"
          value={
            formData.pageCount
          }
          onChange={
            handleChange
          }
        />
      </label>
      {/* Price input */}
      <label>
        Price:
        <input
          type="text"
          name="price"
          value={
            formData.price
          }
          onChange={
            handleChange
          }
        />
      </label>
      {/* Submit button */}
      <button type="submit">
        Add Book
      </button>
      {/* Cancel input */}
      <button
        type="button"
        onClick={onCancel}
      >
        Cancel
      </button>
    </form>
  );
};

export default NewBookForm;
