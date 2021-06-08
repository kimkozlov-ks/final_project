using AutoMapper;
using Garage.API.dto;
using Garage.Data.Entity;
using Garage.Types.Data.Model;

namespace Garage.API.Mappers
{
    public class MapperProfile
    {
        public class MappingProfile: Profile
        {
            public MappingProfile() 
            {
                CreateMap<VehicleDto, VehicleEntity>();
                CreateMap<VehicleEntity, VehicleDto>();
            }
        }
    }
}