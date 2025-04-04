using Microsoft.EntityFrameworkCore;

namespace mission11API.Data
{
    // This class represents the connection to the database and manages book data
    public class BookDbContext : DbContext
    {
        // Constructor that accepts configuration options and passes them to the base DbContext
        public BookDbContext(DbContextOptions<BookDbContext> options) : base(options) 
        { 
        }

        // Represents the Books table in the database
        public DbSet<Book> Books { get; set; }
    }
}


