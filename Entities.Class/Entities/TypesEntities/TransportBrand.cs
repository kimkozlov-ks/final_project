using System.Collections.Generic;
using Infrastructure.Data;

namespace Entities.Class.Entities.TypesEntities
{
    public class TransportBrand : Entity
    {
        public string Name { get; set; }
        public List<TransportModel> Models { get; set; }
    }
}