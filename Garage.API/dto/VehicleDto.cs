using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace Garage.API.dto
{
    public class VehicleDto
    {
        public int Id { get; set; }
        public string Nickname { get; set;  }
        public int TypeId { get; set; }
        [Required]
        public int SubTypeId { get; set; }
        [Required]
        public int BrandId { get; set; }
        [Required]
        public int ModelId { get; set; }
        [Required]
        public string Info { get; set; }
        [Required]
        public IFormFile Image { get; set; }
    }
}