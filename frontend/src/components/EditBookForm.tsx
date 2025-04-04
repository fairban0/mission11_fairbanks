import { useState } from 'react';
import { Book } from '../types/bookService';
import { updateBook} from '../api/BookAPI';

// Props passed into EditBookForm
interface EditBookFormProps {
  book: Book; // The book to be edited
  onSuccess: () => void; // Callback after sucessful update
  onCancel: () => void; // Callback to cancel editing
}

// Component for editing an existing book
const EditBookForm = ({
  book,
  onSuccess,
  onCancel,
}: EditBookFormProps) => {
    // Set up form state intialized with the passed-in book
  const [formData, setFormData] = useState<Book>({ ...book });

  // Update form as user types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit updated book to API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form reload
    await updateBook(formData.bookID, formData); // Send update to backend
    onSuccess(); // Notify parent
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      <h2>Edit Book</h2>
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
        Update Book
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

export default EditBookForm;
