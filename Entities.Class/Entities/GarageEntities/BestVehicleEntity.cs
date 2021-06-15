using System;
using System.ComponentModel.DataAnnotations.Schema;
using Entities.Class.Entities.AuthEntities;

namespace Entities.Class.Entities.GarageEntities
{
    public class BestVehicleEntity: Infrastructure.Data.Entity
    {
        public int UserId { get; set; }
        public User User { get; set; }
        
        public int VehicleEntityId { get; set; }
        public VehicleEntity VehicleEntity { get; set; }
        
        public DateTime DayOfBest { get; set; }
    }
}