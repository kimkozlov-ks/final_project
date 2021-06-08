using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Garage.API.dto;
using Garage.API.Repositories;
using Garage.Data.Entity;
using Microsoft.AspNetCore.Mvc;

namespace Garage.API.Services
{
    public class VehicleService
    {
        private readonly VehicleRepository _vehicleRepository;
        private readonly IMapper _mapper;
        
        public VehicleService(IMapper mapper, VehicleRepository transportModelRepository)
        {
            _mapper = mapper;
            _vehicleRepository = transportModelRepository;
        }

        public async Task<VehicleDto> GetVehicleById(int id)
        {
            var vehicle = await _vehicleRepository.Get(id);

            return _mapper.Map<VehicleDto>(vehicle);

        }

        public async Task<VehicleDto> Add(VehicleDto vehicleDto)
        {
            var gotVehicle = _mapper.Map<VehicleEntity>(vehicleDto);

            var addedVehicle = await _vehicleRepository.Add(gotVehicle);

            var addedVehicleDto = _mapper.Map<VehicleDto>(addedVehicle);

            return addedVehicleDto;
        }
    }
}