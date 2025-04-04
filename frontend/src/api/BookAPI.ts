import { Book } from '../types/bookService';

// Define the shape of the API response for fetching books
interface FetchBooksResponse {
  books: Book[];
  totalNumBooks: number;
}

// Base API URL
const API_URL = ''; // GET API URL WHEN I DEPLOY

/* Fetched a paginated and filtered list of books from the API */
export const fetchBooks =
  async (
    pageSize: number,
    pageNum: number,
    selectedCategories: string[]
  ): Promise<FetchBooksResponse> => {
    try {
      // Convert selected categories into query params
      const categoryParams =
        selectedCategories
          .map(
            (cat) =>
              `category=${encodeURIComponent(cat)}`
          )
          .join('&');

      // Build the final API URL with pagination and filters
      const response =
        await fetch(
          `${API_URL}/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
        );

      if (!response.ok) {
        throw new Error(
          'Failed to fetch books'
        );
      }

      // Return the parsed json response
      return await response.json();
    } catch (error) {
      console.error(
        'Error fetching books:',
        error
      );
      throw error;
    }
  };

  /* Sends a post request to add a new book to the database */
export const addBook = async (
  newBook: Book
): Promise<Book> => {
  try {
    const response =
      await fetch(
        `${API_URL}/AddBook`,
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify(
            newBook
          ),
        }
      );

    if (!response.ok) {
      throw new Error(
        'Failed to add book'
      );
    }

    return await response.json();
  } catch (error) {
    console.error(
      'Error adding book',
      error
    );
    throw error;
  }
};

/* Sends a PUT request to update an existing book */
export const updateBook =
  async (
    bookId: number,
    updatedBook: Book
  ): Promise<Book> => {
    try {
      const response =
        await fetch(
          `${API_URL}/UpdateBook/${bookId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type':
                'application/json',
            },
            body: JSON.stringify(
              updatedBook
            ),
          }
        );

      return await response.json();
    } catch (error) {
      console.error(
        'Error updating book:',
        error
      );
      throw error;
    }
  };

/* Sends a delete request to remove a book by its id */
export const deleteBook =
  async (
    bookId: number
  ): Promise<void> => {
    try {
      const response =
        await fetch(
          `${API_URL}/DeleteBook/${bookId}`,
          {
            method: 'DELETE',
          }
        );

      if (!response.ok) {
        throw new Error(
          'Failed to delete book'
        );
      }
    } catch (error) {
      console.error(
        'Error deleting book:',
        error
      );
      throw error;
    }
  };
