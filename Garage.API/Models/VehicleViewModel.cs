using System.Collections.Generic;
using Garage.API.dto;
using Infrastructure.Data.Pageable;

namespace Garage.API.Models
{
    public class VehicleViewModel
    {
        public IEnumerable<SendVehicleDto> Vehicles { get; set; }
        public PageViewModel PageViewModel { get; set; }
    }
}