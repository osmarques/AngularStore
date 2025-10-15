using Microsoft.EntityFrameworkCore;
using AngularStore.Domain.Entities;

namespace AngularStore.Repository.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.Price).HasPrecision(18, 2);
        });

        modelBuilder.Entity<Product>().HasData(
            new { Id = 1, Name = "Notebook", Description = "Notebook Dell", Price = 2500.00m, Stock = 10, CreatedAt = new DateTime(2024, 1, 1) },
            new { Id = 2, Name = "Mouse", Description = "Mouse Logitech", Price = 50.00m, Stock = 25, CreatedAt = new DateTime(2024, 1, 1) }
        );
    }
}