using Map.API.Model;
using Microsoft.EntityFrameworkCore;

namespace Map.Data
{
    public class MapDbContext : DbContext
    {
        public DbSet<Route> Routes { get; set; }
        
        public MapDbContext(DbContextOptions options) : base(options) { }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // SeedData(modelBuilder);
        }
        
    }
}