using AutoMapper;
using Garage.Types.API.Dto;
using Garage.Types.Data.Model;
using Microsoft.AspNetCore.Routing;

namespace Garage.Types.API.Mapper
{
    public class MappingProfile: Profile
    {
        public MappingProfile() 
        {
            CreateMap<TransportType, TransportTypeDto>();
            CreateMap<TransportTypeAddDto, TransportType>();
            CreateMap<TransportSubType, TransportSubTypeDto>();
            CreateMap<TransportSubTypeAddDto, TransportSubType>()
                .ForMember(dest => dest.TransportId,
                    opt => opt
                        .MapFrom(src =>src.TransportTypeId));
            CreateMap<TransportBrandAddDto, TransportBrand>();
            CreateMap<TransportModelDto, TransportModel>()
                .ForMember(dest => dest.TransportBrandId,
                    opt => opt
                        .MapFrom(src =>src.BrandId));
            
        }
    }
}