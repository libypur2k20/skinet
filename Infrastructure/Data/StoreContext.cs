using Core.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Infrastructure.Data
{
    public class StoreContext : DbContext
    {
        
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {
            
        }

        public DbSet<Product> Products {get; set;}

        public DbSet<ProductType> ProductTypes { get; set; }

        public DbSet<ProductBrand> ProductBrands { get; set; }


        /// <summary>
        /// Tells migrations to use configuration classes for each entity type.
        /// Configurations are on 'Infrastructure/
        /// </summary>
        /// <param name="modelBuilder"></param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}