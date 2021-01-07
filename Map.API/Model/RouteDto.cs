using System.Collections.Generic;

namespace Map.API.Model
{
    public class RouteDto
    {
        public string Name { get; set; }
        public List<MapPoint> Points { get; set; }
    }
}