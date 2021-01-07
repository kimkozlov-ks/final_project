using AutoMapper;
using Map.API.Model;

namespace Map.API.Mapper
{
    public class MappingProfile: Profile
    {
        public MappingProfile() 
        {
            CreateMap<RouteDto, Route>();
            CreateMap<Route, RouteDto>();
        }
    }
}