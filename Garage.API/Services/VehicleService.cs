using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.Internal;
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
        private readonly VoteService _voteService;

        public VehicleService(
            IMapper mapper,
            VehicleRepository transportModelRepository,
            ImageService imageSaver,
            BestVehiclesRepository bestVehiclesRepository, 
            VoteService voteService)
        {
            _mapper = mapper;
            _vehicleRepository = transportModelRepository;
            _imageSaver = imageSaver;
            _bestVehiclesRepository = bestVehiclesRepository;
            _voteService = voteService;
        }

        public async Task<SendVehicleDto> GetVehicleById(int id)
        {
            var vehicle = await _vehicleRepository.Get(id);

            return _mapper.Map<SendVehicleDto>(vehicle);

        }

        public async Task<SendVehicleDto> Add(AddVehicleDto addVehicleDto, string userId)
        {
            var imageName = await _imageSaver.Save(addVehicleDto.Image);

            var gotVehicle = _mapper.Map<VehicleEntity>(addVehicleDto, opt =>
            {
                opt.Items["image"] = "https://localhost:5009/images/" + imageName;
                opt.Items["userId"] = userId;
            });

            var addedVehicle = await _vehicleRepository.Add(gotVehicle);

            if (addedVehicle == null)
            {
                return null;
            }
            
            return _mapper.Map<SendVehicleDto>(addedVehicle);
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

        public async Task<VehicleViewModel> GetVehicles(int page, int size, string userId)
        {
            var count = _vehicleRepository.Count();
            var vehicleEntities = await _vehicleRepository.GetPage(page, size);

            var vehicleDtos = vehicleEntities.Select(v => _mapper.Map<SendVehicleDto>(v)).ToList();

            PageViewModel pageViewModel = new PageViewModel(count, page, size);
            VehicleViewModel viewModel = new VehicleViewModel
            {
                PageViewModel = pageViewModel,
                Vehicles = vehicleDtos,
                VotedVehicles = userId == null 
                    ? null 
                    : vehicleDtos.Select(v => v.Id).Where(id => 
                        _voteService.IsVoted(id, int.Parse(userId)))
            };

            return viewModel;
        }

        public async Task<List<SendVehicleDto>> GetBestVehiclesOfTheDay()
        {
            var bestVehicles = await _bestVehiclesRepository.GetBestOfTheDay();

            List<SendVehicleDto> sendVehicleDtos = new List<SendVehicleDto>();
            foreach (var bestVehicle in bestVehicles)
            {
                sendVehicleDtos.Add(_mapper.Map<SendVehicleDto>(bestVehicle.VehicleEntity));
            }

            return sendVehicleDtos;
        }

        public async Task<bool> Edit(EditVehicleDto editVehicleDto, string userId)
        {
            var vehicle = await _vehicleRepository.Get(editVehicleDto.Id);

            if (!vehicle.UserId.ToString().Equals(userId))
            {
                return false;
            }

            vehicle.Nickname = editVehicleDto.Nickname;
            vehicle.Description = editVehicleDto.Description;
            vehicle.TransportBrandId = editVehicleDto.TransportBrandId;
            vehicle.TransportModelId = editVehicleDto.TransportModelId;
            vehicle.TransportTypeId = editVehicleDto.TransportTypeId;
            vehicle.TransportSubTypeId = editVehicleDto.TransportSubTypeId;
            if (editVehicleDto.Image != null)
            {    
                // TODO: remove old image!
                var imageName = await _imageSaver.Save(editVehicleDto.Image);
                vehicle.Image = "https://localhost:5009/images/" + imageName;
            }

            var res = await _vehicleRepository.Update(vehicle);

            return res != null;
        }

        public async Task<object> GetFilteredVehicles(VehicleFilterQueryParams vehicleFilterQueryParams, int page, int size)
        {
            var filter = GetFilterPredicate(vehicleFilterQueryParams);
            var count = await _vehicleRepository.GetFilteredCount(filter);
            var vehicleEntities = await _vehicleRepository.GetFiltered(filter, page, size);

            var vehicleDtos = vehicleEntities.Select(v => _mapper.Map<SendVehicleDto>(v)).ToList();

            PageViewModel pageViewModel = new PageViewModel(count, page, size);
            VehicleViewModel viewModel = new VehicleViewModel
            {
                PageViewModel = pageViewModel,
                Vehicles = vehicleDtos
            };

            return viewModel;
        }
        
        private Expression<Func<VehicleEntity, bool>> GetFilterPredicate(VehicleFilterQueryParams f)
        {
            Expression res = Expression.Constant(true);
            
            var paramExpr = Expression.Parameter(typeof(VehicleEntity));

            var expressions = new List<KeyValuePair<bool, Expression<Func<VehicleEntity, bool>>>>()
            {    
                new KeyValuePair<bool, Expression<Func<VehicleEntity, bool>>>(true,
                    v => true),
                new KeyValuePair<bool, Expression<Func<VehicleEntity, bool>>>(f.TypeId != null,
                    v => v.TransportTypeId == f.TypeId),
                new KeyValuePair<bool, Expression<Func<VehicleEntity, bool>>>(f.SubTypeId != null,
                    v => v.TransportSubTypeId == f.SubTypeId),
                new KeyValuePair<bool, Expression<Func<VehicleEntity, bool>>>(f.BrandId != null,
                    v => v.TransportBrandId == f.BrandId),
                new KeyValuePair<bool, Expression<Func<VehicleEntity, bool>>>(f.ModelId != null,
                    v => v.TransportModelId == f.ModelId)
            };
        
            expressions.ForAll(exp =>
            {
                if(exp.Key){
                    res = Expression.And(res, Expression.Invoke(exp.Value, paramExpr));
                }
            });

            return Expression.Lambda<Func<VehicleEntity, bool>>(res, paramExpr);
        }

        public async Task<VehicleEntity> DeleteVehicle(int id)
        {
            return await _vehicleRepository.Delete(id);
        }

        public async Task UpdateBestVehicles()
        {
            await _bestVehiclesRepository.RemoveByDate(DateTime.Now.Date);
            var bestVehiclesId = await _voteService.GetBestVehiclesIdToday();
            var bestVehicles = await _vehicleRepository.GetByListIds(bestVehiclesId);
            var bestVehiclesMapped =
                bestVehicles.Select(bV => 
                    _mapper.Map<BestVehicleEntity>(bV, opt =>
                    {
                        opt.Items["date"] = DateTime.Now.Date.AddDays(-1);
                    })).ToList();
            foreach (var bV in bestVehiclesMapped)
                await _bestVehiclesRepository.Add(bV);
        }
    }
}