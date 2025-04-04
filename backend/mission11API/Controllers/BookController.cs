using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mission11API.Data;

namespace mission11API.Controllers
{
    // This controller handles book-related API requests
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;

        // Constructor injects the database context
        public BookController(BookDbContext temp) => _bookContext = temp;

        // GET: /Book/AllBooks?pageSize=10&pageNum=1&Category=Fiction
        // Returns a paginated list of books, optionally filtered by category
        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 10, int pageNum = 1, [FromQuery] List<string>? Category = null)
        {
            // Start with a queryable version of the Books table
            var query = _bookContext.Books.AsQueryable();

            // Filter by selected categories if provided
            if (Category != null && Category.Any())
            {
                query = query.Where(b => Category.Contains(b.Category));
            }

            var totalNumBooks = query.Count(); // Count total number of matching books

            // Get only the books for the current page
            var something = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            // Return books along with the total count
            var someObject = new
            {
                Books = something,
                TotalNumBooks = totalNumBooks
            };

            return Ok(someObject);
        }

        // GET: /Book/GetBookCategories
        // Returns a list of all distinct book categories
        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories()
        {
            var Category = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(Category);
        }

        // GET: /Book/{id}
        // Returns a specific book by its ID
        [HttpGet("{id}")]
        public IActionResult GetBookById(int id)
        {
            var book = _bookContext.Books.FirstOrDefault(b => b.BookID == id);

            if (book == null)
            {
                return NotFound(); // Return 404 if book not found
            }

            return Ok(book); // Return the book details
        }

        // Add Book
        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }

        // Update Book
        [HttpPut("UpdateBook/{bookId}")]
        public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook)
        {
            var existingBook = _bookContext.Books.Find(bookId);

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _bookContext.Books.Update(existingBook);
            _bookContext.SaveChanges();

            return Ok(existingBook);
        }

        // Delete Book
        [HttpDelete("DeleteBook/{bookId}")]
        public IActionResult DeleteBook(int bookId)
        {
            var book = _bookContext.Books.Find(bookId);

            if (book == null)
            {
                return NotFound(new { message = "Book not found" });
            }

            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();

            return NoContent();
        }
    }
}
