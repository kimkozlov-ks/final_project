using System;
using System.ComponentModel.DataAnnotations.Schema;
using Entities.Class.Entities.AuthEntities;
using Entities.Class.Entities.TypesEntities;

namespace Entities.Class.Entities.GarageEntities
{
    public class VehicleEntity : Infrastructure.Data.Entity
    {
        public int Id { get; set; }
        
        public int UserId { get; set; }
        public User User { get; set; }
        
        public string Nickname { get; set;  }
        
        public int TransportTypeId { get; set; }
        public TransportType TransportType { get; set; }
        
        public int TransportSubTypeId { get; set; }
        public TransportSubType TransportSubType { get; set; }
        
        public int TransportBrandId { get; set; }
        public TransportBrand TransportBrand { get; set; }
        
        public int TransportModelId { get; set; }
        public TransportModel TransportModel { get; set; }
        
        public string Description { get; set; }
        
        public string Image { get; set; }
        
        public DateTime CreateDate { get; set; }
        public bool IsActive { get; set; }
        
        public int Rating { get; set; }
    }
}