using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mission11API.Data;

namespace mission11API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;

        public BookController(BookDbContext temp) => _bookContext = temp;

        [HttpGet("AllBooks")]
        public IEnumerable<Book> GetBooks()
        {
            var something = _bookContext.Books.ToList();

            return something;
        }

        [HttpGet("BooksPaged")]
        public IActionResult GetBooksPaged(int page = 1, int pageSize = 5, string sortBy = "Title", bool ascending = true)
        {
            var query = _bookContext.Books.AsQueryable();

            // Sorting
            query = sortBy.ToLower() switch
            {
                "title" => ascending ? query.OrderBy(b => b.Title) : query.OrderByDescending(b => b.Title),
                "author" => ascending ? query.OrderBy(b => b.Author) : query.OrderByDescending(b => b.Author),
                "price" => ascending ? query.OrderBy(b => b.Price) : query.OrderByDescending(b => b.Price),
                _ => query.OrderBy(b => b.Title)
            };

            var totalItems = query.Count();

            // Pagination
            var books = query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new
            {
                totalItems,
                books
            });
        }


    }
}