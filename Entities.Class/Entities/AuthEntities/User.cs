using System.Collections.Generic;
using Entities.Class.Entities.GarageEntities;
using Infrastructure.Data;

namespace Entities.Class.Entities.AuthEntities
{
    public class User : Entity
    {
        public int RoleId { get; set; }

        public Role Role { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public RefreshToken RefreshToken { get; set; }
        
        public ICollection<VehicleEntity> VehicleEntities { get; set; }
        public ICollection<VoteEntity> VoteEntities { get; set; }
        public ICollection<BestVehicleEntity> BestVehicleEntities { get; set; }
    }
}