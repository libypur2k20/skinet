using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IProductRepository
    {
         Task<Product> GetProductByIdAsync(Int32 id);

         Task<IReadOnlyList<Product>> GetProductsAsync();
    }
}