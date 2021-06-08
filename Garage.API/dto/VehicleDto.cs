namespace Garage.API.dto
{
    public class VehicleDto
    {
        public int Id { get; set; }
        public int TypeId { get; set; }
        public int SubTypeId { get; set; }
        public int BrandId { get; set; }
        public int ModelId { get; set; }
        public string Info { get; set; }
        public string ImageUrl { get; set; }
    }
}