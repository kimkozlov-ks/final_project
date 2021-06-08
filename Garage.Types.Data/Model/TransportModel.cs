using System.ComponentModel.DataAnnotations.Schema;
using Infrastructure.Data;

namespace Garage.Types.Data.Model
{
    public class TransportModel : Entity
    {
        public string Name { get; set; }
        
        [ForeignKey("TransportBrand")]
        public int TransportBrandId { get; set; }
        public TransportBrand TransportBrand { get; set; }
    }
}