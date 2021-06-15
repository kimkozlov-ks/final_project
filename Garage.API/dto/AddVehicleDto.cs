using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace Garage.API.dto
{
    public class AddVehicleDto
    {
        public int Id { get; set; }
        public string Nickname { get; set;  }
        [Required]
        public int TransportTypeId { get; set; }
        [Required]
        public int TransportSubTypeId { get; set; }
        [Required]
        public int TransportBrandId { get; set; }
        [Required]
        public int TransportModelId { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public IFormFile Image { get; set; }
    }
}