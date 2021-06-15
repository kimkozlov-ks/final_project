using Garage.Data.Entity;
using Microsoft.EntityFrameworkCore;

namespace Garage.Data
{
    public class VehicleDbContext: DbContext
    {
        public DbSet<VehicleEntity> Vehicles { get; set; }
        public DbSet<VoteEntity> Votes { get; set; }

        public VehicleDbContext(DbContextOptions options) : base(options) { }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            SeedData(modelBuilder);
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
        }
    }
}