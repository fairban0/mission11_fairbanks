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
    }
}
