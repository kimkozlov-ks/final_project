using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Garage.Data.Entity
{
    public class BestVehicleEntity: Infrastructure.Data.Entity
    {
        [ForeignKey("Vehicles")]
        public int VehicleEntityId { get; set; }
        public VehicleEntity VehicleEntity { get; set; }
        public DateTime DayOfBest { get; set; }
    }
}