using Microsoft.EntityFrameworkCore;

namespace Garage.Data
{
    public class VehicleDbContext: DbContext
    {
        public VehicleDbContext(DbContextOptions options) : base(options) { }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            SeedData(modelBuilder);

            // modelBuilder.Entity<TransportType>()
            //     .HasMany(t => t.SubTypes);
            //
            // modelBuilder.Entity<TransportBrand>()
            //     .HasMany(t => t.Models);
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
        }
    }
}