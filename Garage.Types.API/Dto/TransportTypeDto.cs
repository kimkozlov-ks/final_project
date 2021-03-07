using System.Collections.Generic;
using Garage.Types.Data.Model;

namespace Garage.Types.API.Dto
{
    public class TransportTypeDto
    {
        public string Name { get; set; }
        public List<TransportSubType> TransportSubTypes { get; set; }
    }
}