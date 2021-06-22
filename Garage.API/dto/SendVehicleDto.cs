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
        public int UserId { get; set; }
        [Required]
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
        public string Image { get; set; }
        [Required]
        public DateTime CreateDate { get; set; }
        [Required]
        public int Rating { get; set; }
    }
}