using Auth.Data;
using Infrastructure.Data;

namespace Map.API.Model
{
    public class UserRoute : Entity
    {
        public User User { get; set; }

        public int UserId { get; set; }

        public Route Route { get; set; }
        
        public int RouteId { get; set; }
    }
}