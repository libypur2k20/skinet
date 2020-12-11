using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities
{
    public class Product : BaseEntity
    {

        public String Name { get; set; }

        public String  Description { get; set; }

        public decimal Price { get; set; }

        public string PictureUrl { get; set; }

        [ForeignKey(nameof(ProductTypeId))]
        public ProductType ProductType { get; set; }

        public Int32 ProductTypeId { get; set; }

        [ForeignKey(nameof(ProductBrandId))]
        public ProductBrand ProductBrand { get; set; }

        public Int32 ProductBrandId { get; set; }

    }
}