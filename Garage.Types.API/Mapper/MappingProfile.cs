using System.Linq;
using AutoMapper;
using Entities.Class.Entities.TypesEntities;
using Garage.Types.API.Dto;
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
                .ForMember(dest => dest.TransportTypeId,
                    opt => opt
                        .MapFrom(src =>src.TransportTypeId));
            CreateMap<TransportBrandAddDto, TransportBrand>();
            CreateMap<TransportBrand, TransportBrandDto>()
                .ForMember(
                    dest => dest.Models, 
                    opt => 
                        opt.MapFrom(src => src.Models));

            CreateMap<TransportModelDto, TransportModel>()
                .ForMember(dest => dest.TransportBrandId,
                    opt => opt
                        .MapFrom(src =>src.TransportBrandId));
            CreateMap<TransportModel, TransportModelDto>();
        }
    }
}