using System;
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
                CreateMap<AddVehicleDto, VehicleEntity>()
                    .ForMember(dest =>
                        dest.IsActive, opt =>
                        opt.MapFrom(src => true))
                    .ForMember(dest =>
                        dest.Image, opt =>
                        opt.MapFrom((src, dst, _, context) =>
                            context.Options.Items["image"]
                        ))
                    .ForMember(dest =>
                        dest.CreateDate, opt =>
                        opt.MapFrom(src => DateTime.UtcNow))
                    .ForMember(dest =>
                        dest.OwnerUserId, opt =>
                        opt.MapFrom((src, dst, _, context) =>
                            context.Options.Items["userId"]
                        ));
                CreateMap<VehicleEntity, SendVehicleDto>();
                CreateMap<VoteDto, VoteEntity>()
                    .ForMember(dest =>
                        dest.VoteTime, opt =>
                        opt.MapFrom(src => DateTime.UtcNow))
                    .ForMember(dest =>
                        dest.UserId, opt =>
                        opt.MapFrom((src, dst, _, context) =>
                            context.Options.Items["userId"]
                        ));
                CreateMap<VehicleEntity, BestVehicleEntity>()
                    .ForMember(dest =>
                        dest.VehicleEntityId, opt =>
                        opt.MapFrom(src => src.Id))
                    .ForMember(dest =>
                        dest.DayOfBest, opt =>
                        opt.MapFrom(src => src.CreateDate.Date))
                    .ForMember(dest => 
                        dest.Id, opt => 
                            opt.Ignore());

            }
        }
    }
}