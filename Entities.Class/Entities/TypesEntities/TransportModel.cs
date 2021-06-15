using System.ComponentModel.DataAnnotations.Schema;
using Infrastructure.Data;

namespace Entities.Class.Entities.TypesEntities
{
    public class TransportModel : Entity
    {
        public string Name { get; set; }
        
        [ForeignKey("TransportBrand")]
        public int TransportBrandId { get; set; }
        public TransportBrand TransportBrand { get; set; }
    }
}