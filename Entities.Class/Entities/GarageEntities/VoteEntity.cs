using System;
using System.ComponentModel.DataAnnotations.Schema;
using Entities.Class.Entities.AuthEntities;

namespace Entities.Class.Entities.GarageEntities
{
    public class VoteEntity: Infrastructure.Data.Entity
    {
        public int VehicleEntityId { get; set; }
        public VehicleEntity VehicleEntity { get; set; }
        
        public int UserId { get; set; }
        public User User { get; set; }
        
        public int Power { get; set; }
        public DateTime VoteTime { get; set; }
    }
}