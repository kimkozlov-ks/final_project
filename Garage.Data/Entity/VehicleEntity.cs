using System.ComponentModel.DataAnnotations.Schema;

namespace Garage.Data.Entity
{
    public class VehicleEntity : Infrastructure.Data.Entity
    {
        public int Id { get; set; }
        
        [ForeignKey("TransportType")]
        public int TypeId { get; set; }
        
        [ForeignKey("TransporSubtType")]
        public int SubTypeId { get; set; }
        
        [ForeignKey("TransportBrand")]
        public int BrandId { get; set; }
        
        [ForeignKey("TransportModel")]
        public int ModelId { get; set; }
        
        public string Info { get; set; }
        
        public string ImageUrl { get; set; }
    }
}