using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace Garage.API.dto
{
    public class SendVehicleDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Nickname { get; set;  }
        [Required]
        public int TypeId { get; set; }
        [Required]
        public int SubTypeId { get; set; }
        [Required]
        public int BrandId { get; set; }
        [Required]
        public int ModelId { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Image { get; set; }
        [Required]
        public DateTime CreateDate { get; set; }
    }
}