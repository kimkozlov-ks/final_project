using System.ComponentModel.DataAnnotations.Schema;
using Infrastructure.Data;

namespace Garage.Types.Data.Model
{
    public class TransportSubType : Entity
    {
        public string Name { get; set; }
        
        [ForeignKey("TransportType")]
        public int TransportTypeId { get; set; }
        public TransportType TransportType { get; set; }
    }
}