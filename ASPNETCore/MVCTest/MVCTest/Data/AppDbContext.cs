using Microsoft.EntityFrameworkCore;
using MVCTest.Models;

namespace MVCTest.Data
{
    public class AppDbContext : DbContext /* Add Microsoft.EntityFrameworkCore */
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        /*
        Tools\Nuget Package Manager\Package Manager Console
        add-migration AddCategoryTable
        update-database
        */
        public DbSet<Category> Categories { get; set; }
    }
}
