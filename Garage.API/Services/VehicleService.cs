using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Garage.API.dto;
using Garage.API.Interface;
using Garage.API.Repositories;
using Garage.Data.Entity;
using Microsoft.AspNetCore.Mvc;

namespace Garage.API.Services
{
    public class VehicleService
    {
        private readonly VehicleRepository _vehicleRepository;
        private readonly IMapper _mapper;
        private readonly ImageService _imageSaver;
        public VehicleService(IMapper mapper, VehicleRepository transportModelRepository, ImageService imageSaver)
        {
            _mapper = mapper;
            _vehicleRepository = transportModelRepository;
            _imageSaver = imageSaver;
        }

        public async Task<VehicleDto> GetVehicleById(int id)
        {
            var vehicle = await _vehicleRepository.Get(id);

            return _mapper.Map<VehicleDto>(vehicle);

        }

        public async Task<VehicleDto> Add(VehicleDto vehicleDto)
        {    
            var imageName = await _imageSaver.Save(vehicleDto.Image);
            
            var gotVehicle = _mapper.Map<VehicleEntity>(vehicleDto, opt =>
            {
                opt.Items["image"] = imageName;
            });

            var addedVehicle = await _vehicleRepository.Add(gotVehicle);
            
            return vehicleDto;
        }
    }
}