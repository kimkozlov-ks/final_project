using System.Collections.Generic;
using Garage.Types.Data.Model;

namespace Garage.Types.API.Dto
{
    public class TransportTypeDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<TransportSubType> SubTypes { get; set; }
    }
}