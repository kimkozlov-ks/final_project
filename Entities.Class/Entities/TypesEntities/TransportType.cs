using System.Collections.Generic;
using Infrastructure.Data;

namespace Entities.Class.Entities.TypesEntities
{
    public class TransportType : Entity
    {
        public string Name { get; set; }
        public List<TransportSubType> SubTypes { get; set; }
    }
}