using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Entities.Class.Entities.TypesEntities;
using Garage.Types.API.Dto;
using Garage.Types.API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Garage.Types.API.Services
{
    public class TransportModelService
    {
        private readonly TransportModelRepository _transportModelRepository;
        private readonly IMapper _mapper;

        public TransportModelService(IMapper mapper, TransportModelRepository transportModelRepository)
        {
            _mapper = mapper;
            _transportModelRepository = transportModelRepository;
        }

        public async Task<TransportModelDto> AddTransportModel(TransportModelDto transportModelDto)
        {
            var transportBrand = _mapper.Map<TransportModel>(transportModelDto);

            var addedModel = await _transportModelRepository.Add(transportBrand);

            var addedModelDto = _mapper.Map<TransportModelDto>(addedModel);

            return addedModelDto;
        }

        public async Task<ActionResult<IEnumerable<TransportModelDto>>> GetTransportModelsByBrand(int id)
        {
            var modelsByBrand = await _transportModelRepository.GetModelsByBrandId(id);
            
            var modelsByBrandDtos = modelsByBrand.Select(s => _mapper.Map<TransportModelDto>(s)).ToList();
            
            return modelsByBrandDtos;
        }

        public async Task EditModel(TransportModelDto transportModelDto)
        {
            var transportModel = await _transportModelRepository.Get(transportModelDto.Id);

            if (transportModel == null)
            {
                return;
            }

            transportModel.Name = transportModelDto.Name;
            
            await _transportModelRepository.Update(transportModel);
        }

        public async Task<ActionResult<TransportModelDto>> GetTransportModel(int id)
        {
            var transportModel = await _transportModelRepository.Get(id);

            return _mapper.Map<TransportModelDto>(transportModel);
        }
    }
}