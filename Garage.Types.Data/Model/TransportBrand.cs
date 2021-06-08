using System.Collections.Generic;
using Infrastructure.Data;

namespace Garage.Types.Data.Model
{
    public class TransportBrand : Entity
    {
        public string Name { get; set; }
        public List<TransportSubType> Models { get; set; }
    }
}