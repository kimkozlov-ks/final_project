using System.Collections.Generic;

namespace Garage.Types.API.Dto
{
    public class TransportBrandDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<TransportModelDto> Models { get; set; }
    }
}