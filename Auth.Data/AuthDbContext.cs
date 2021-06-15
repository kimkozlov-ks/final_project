using Entities.Class.Entities.AuthEntities;
using Microsoft.EntityFrameworkCore;

namespace Auth.Data
{
    public class AuthDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<RolePermission> RolePermissions { get; set; }

        public DbSet<RefreshToken> RefreshTokens { get; set; }

        public AuthDbContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            SeedData(modelBuilder);

            modelBuilder.Entity<User>()
                .HasOne(u => u.RefreshToken)
                .WithOne(rt => rt.User)
                .HasForeignKey<RefreshToken>(rt => rt.UserId);

            modelBuilder.Entity<RefreshToken>()
                .HasIndex(rt => rt.UserId)
                .IsUnique();

            modelBuilder.Entity<RolePermission>()
                .Property(rp => rp.PermissionType)
                .HasConversion<int>();

            modelBuilder.Entity<RolePermission>()
                .HasIndex(rp => rp.RoleId);

            modelBuilder.Entity<RolePermission>()
                .HasIndex(rp => new {rp.RoleId, rp.PermissionType})
                .IsUnique();
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
        }
    }
}