using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Entities.Class.Entities.GarageEntities;
using Garage.API.dto;
using Garage.API.Models;
using Garage.API.Repositories;
using Infrastructure.Data.Pageable;
using Microsoft.AspNetCore.Mvc;

namespace Garage.API.Services
{
    public class VehicleService
    {
        private readonly VehicleRepository _vehicleRepository;
        private readonly IMapper _mapper;
        private readonly ImageService _imageSaver;
        private readonly BestVehiclesRepository _bestVehiclesRepository;

        public VehicleService(
            IMapper mapper,
            VehicleRepository transportModelRepository,
            ImageService imageSaver,
            BestVehiclesRepository bestVehiclesRepository)
        {
            _mapper = mapper;
            _vehicleRepository = transportModelRepository;
            _imageSaver = imageSaver;
            _bestVehiclesRepository = bestVehiclesRepository;
        }

        public async Task<AddVehicleDto> GetVehicleById(int id)
        {
            var vehicle = await _vehicleRepository.Get(id);

            return _mapper.Map<AddVehicleDto>(vehicle);

        }

        public async Task<AddVehicleDto> Add(AddVehicleDto addVehicleDto, string userId)
        {
            var imageName = await _imageSaver.Save(addVehicleDto.Image);

            var gotVehicle = _mapper.Map<VehicleEntity>(addVehicleDto, opt =>
            {
                opt.Items["image"] = "https://localhost:5009/images/" + imageName;
                opt.Items["userId"] = userId;
            });

            var addedVehicle = await _vehicleRepository.Add(gotVehicle);

            return addVehicleDto;
        }

        public async Task<VehicleViewModel> GetUserVehicle(string userId, int page, int size)
        {
            var userVehicles = await _vehicleRepository.GetUserVehicles(int.Parse(userId));

            var sendVehicleDtos = userVehicles.Select(v =>
                _mapper.Map<SendVehicleDto>(v)).ToList();

            PageViewModel pageViewModel = new PageViewModel(sendVehicleDtos.Count(), page, size);
            VehicleViewModel viewModel = new VehicleViewModel
            {
                PageViewModel = pageViewModel,
                Vehicles = sendVehicleDtos.Skip((page - 1) * size).Take(size).ToList()
            };

            return viewModel;
        }

        public async Task<VehicleViewModel> GetVehicles(int page, int size)
        {
            var count = _vehicleRepository.Count();
            var vehicleEntities = await _vehicleRepository.GetPage(page, size);

            var vehicleDtos = vehicleEntities.Select(v => _mapper.Map<SendVehicleDto>(v)).ToList();

            PageViewModel pageViewModel = new PageViewModel(count, page, size);
            VehicleViewModel viewModel = new VehicleViewModel
            {
                PageViewModel = pageViewModel,
                Vehicles = vehicleDtos
            };

            return viewModel;
        }

        public async Task<List<SendVehicleDto>> GetBestVehiclesOfTheDay()
        {
            var bestVehicles = await _bestVehiclesRepository.GetBestOfTheDay();

            List<SendVehicleDto> sendVehicleDtos = new List<SendVehicleDto>();
            foreach (var bestVehicle in bestVehicles)
            {
                sendVehicleDtos.Add(_mapper.Map<SendVehicleDto>(bestVehicle));
            }

            return sendVehicleDtos;
        }
    }
}