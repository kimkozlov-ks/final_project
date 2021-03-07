using Garage.Types.Data.Model;
using Microsoft.EntityFrameworkCore;

namespace Garage.Types.Data
{
    public class TypesDbContext : DbContext
    {
        public DbSet<TransportType> TransportTypes { get; set; }
    
        public DbSet<TransportSubType> TransportSubTypes { get; set; }
        
        public DbSet<PostType> PostTypes { get; set; }
    
        public TypesDbContext(DbContextOptions options) : base(options) { }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            SeedData(modelBuilder);

            modelBuilder.Entity<TransportType>()
                .HasMany(t => t.SubTypes);
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
        }
    }
}