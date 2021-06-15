using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Auth.Data;
using Garage.Types.Data.Model;

namespace Garage.Data.Entity
{
    public class VehicleEntity : Infrastructure.Data.Entity
    {
        public int Id { get; set; }
        
        [ForeignKey("User")]
        public int OwnerUserId { get; set; }
        
        public string Nickname { get; set;  }
        
        [ForeignKey("TransportType")]
        public int TypeId { get; set; }
        
        [ForeignKey("TransportSubType")]
        public int SubTypeId { get; set; }
        
        [ForeignKey("TransportBrand")]
        public int TransportBrandId { get; set; }
        
        [ForeignKey("TransportModeld")]
        public int TransportModelId { get; set; }
        
        public string Description { get; set; }
        
        public string Image { get; set; }
        
        public DateTime CreateDate { get; set; }
        public bool IsActive { get; set; }
        
        public int Rating { get; set; }
        
        public ICollection<BestVehicleEntity> BestVehicleEntities { get; set; }
    }
}