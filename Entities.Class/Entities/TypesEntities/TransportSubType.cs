using System.ComponentModel.DataAnnotations.Schema;
using Infrastructure.Data;

namespace Entities.Class.Entities.TypesEntities
{
    public class TransportSubType : Entity
    {
        public string Name { get; set; }
        
        [ForeignKey("TransportType")]
        public int TransportTypeId { get; set; }
        public TransportType TransportType { get; set; }
    }
}