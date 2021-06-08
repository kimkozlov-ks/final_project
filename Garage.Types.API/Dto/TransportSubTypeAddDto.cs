namespace Garage.Types.API.Dto
{
    public class TransportSubTypeAddDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int TransportTypeId { get; set; }
        public string IdAsStr => TransportTypeId.ToString();
    }
}