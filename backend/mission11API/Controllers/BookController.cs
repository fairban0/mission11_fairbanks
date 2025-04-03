using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mission11API.Data;

namespace mission11API.Controllers
{
    // This controller handles HTTP requests related to books.
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;

        // Constructor injecting the BookDbContext dependency
        public BookController(BookDbContext temp) => _bookContext = temp;

        // GET: /Book/AllBooks
        // Returns all books in the database
        [HttpGet("AllBooks")]
        public IEnumerable<Book> GetBooks()
        {
            // Fetch all books from the database
            var something = _bookContext.Books.ToList();

            return something;
        }

        // GET: /Book/BooksPaged
        // Returns a paginated and optionally sorted list of books
        [HttpGet("BooksPaged")]
        public IActionResult GetBooksPaged(int page = 1, int pageSize = 5, string sortBy = "Title", bool ascending = true)
        {
            // Start with a queryable version of the Books table
            var query = _bookContext.Books.AsQueryable();

            // Apply sorting based on the 'sortBy' field and direction (ascending or descending)
            query = sortBy.ToLower() switch
            {
                "title" => ascending ? query.OrderBy(b => b.Title) : query.OrderByDescending(b => b.Title),
                "author" => ascending ? query.OrderBy(b => b.Author) : query.OrderByDescending(b => b.Author),
                "price" => ascending ? query.OrderBy(b => b.Price) : query.OrderByDescending(b => b.Price),
                _ => query.OrderBy(b => b.Title) // Default sort by Title
            };

            // Get the total number of items before pagination
            var totalItems = query.Count();

            // Apply pagination logic: skip items from previous pages, take items for current page
            var books = query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            // Return the paginated result along with the total item count
            return Ok(new
            {
                totalItems,
                books
            });
        }
    }
}
