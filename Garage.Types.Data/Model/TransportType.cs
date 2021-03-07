using System.Collections.Generic;
using Infrastructure.Data;

namespace Garage.Types.Data.Model
{
    public class TransportType : Entity
    {
        public string Name { get; set; }
        public List<TransportSubType> SubTypes { get; set; }
    }
}