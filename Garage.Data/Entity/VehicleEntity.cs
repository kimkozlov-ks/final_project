using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Garage.Data.Entity
{
    public class VehicleEntity : Infrastructure.Data.Entity
    {
        public int Id { get; set; }
        
        public string Nickname { get; set;  }
        
        [ForeignKey("TransportType")]
        public int TypeId { get; set; }
        
        [ForeignKey("TransporSubtType")]
        public int SubTypeId { get; set; }
        
        [ForeignKey("TransportBrand")]
        public int BrandId { get; set; }
        
        [ForeignKey("TransportModel")]
        public int ModelId { get; set; }
        
        public string Description { get; set; }
        
        public string Image { get; set; }
        
        public DateTime CreateDate { get; set; }
        public bool IsActive { get; set; }
    }
}