using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        public ProductsWithTypesAndBrandsSpecification(ProductSpecParams productParams)
	: base( x => 
		(!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) &&
		(!producParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId) &&
		(String.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search))
	)
        {
            SetIncludes();
	    AddOrderBy(p => p.Name);

	    if (!String.IsNullOrEmpty(productParams.Sort))
	    {
		swtich(productParams.Sort)
		{
		    case "priceAsc":
			AddOrderBy(p => p.Price);
			break;
		    case "priceDesc":
			AddOrderByDescending(p => p.Price);
			break;
		    default:
			AddOrderBy(p => p.Name);
			break;
		}
	    }

	    int skipItems = (productParams.PageSize * (productParams.PageIndex - 1));
	    ApplyPaging(skipItems,productParams.PageSize);
        }

        public ProductsWithTypesAndBrandsSpecification(int id) : base(p => p.Id == id) {
            SetIncludes();
        }

        private void SetIncludes()
        {
            AddInclude(p => p.ProductBrand);
            AddInclude(p => p.ProductType);
        }
    }
}
