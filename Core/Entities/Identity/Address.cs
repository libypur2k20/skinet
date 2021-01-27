using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities.Identity
{
    public class Address
    {
        public int Id { get; set; }
        public string FirstName {get;set;}
        public string LastName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zipcode { get; set; }
        [Required]
        public string AppUserId {get; set;}
        [ForeignKey(nameof(AppUserId))]
        public AppUser AppUser { get; set; }
    }
}