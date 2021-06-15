using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Dynamic;
using Auth.Data;

namespace Garage.Data.Entity
{
    public class VoteEntity: Infrastructure.Data.Entity
    {
        [ForeignKey("Vehicles")]
        public int VehicleId { get; set; }
        
        [ForeignKey("Users")]
        public int UserId { get; set; }
        
        public int Power { get; set; }
        public DateTime VoteTime { get; set; }
    }
}