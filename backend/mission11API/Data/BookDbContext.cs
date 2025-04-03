using Microsoft.EntityFrameworkCore;

namespace mission11API.Data
{
    // This class represents the Entity Framework database context for the application.
    // It manages the connection to the database and provides access to the Book entities.
    public class BookDbContext : DbContext
    {
        // Constructor that receives the DbContextOptions and passes them to the base class.
        // These options typically include configuration like the connection string.
        public BookDbContext(DbContextOptions<BookDbContext> options) : base(options) { }

        // DbSet representing the Books table in the database.
        // Allows CRUD operations to be performed on Book entities.
        public DbSet<Book> Books { get; set; }
    }
}


