using Microsoft.VisualBasic.CompilerServices;

namespace Garage.API.Models
{
    public class VehicleFilterQueryParams
    {
        public int? TypeId { get; set; }
        public int? SubTypeId { get; set; }
        public int? BrandId { get; set; }
        public int? ModelId { get; set; }
    }
}