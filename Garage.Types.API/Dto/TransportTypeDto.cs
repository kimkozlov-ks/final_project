using System.Collections.Generic;

namespace Garage.Types.API.Dto
{
    public class TransportTypeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<TransportSubTypeDto> SubTypes { get; set; }
    }
}