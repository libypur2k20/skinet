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

	    //Convert decimal entity properties to double to avoid error on sorting.
	    if(Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite")
	    {
		foreach(var entityType in modelBuilder.Model.GetEntityTypes())
		{
		    var properties = entityType.ClrType.GetProperties().Where(p => p.PropertyType == typeof(decimal));

		    foreach(var property in properties)
		    {
			modelBuilder.Entity(entityType.Name).Property(property.Name).HasConversion<double>();
		    }			
		}
	    }
        }
    }
}