using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Garage.Types.API.Dto;
using Garage.Types.API.Repositories;
using Garage.Types.Data.Model;
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

        public async Task AddTransportModel(TransportModelDto transportModelDto)
        {
            var transportBrand = _mapper.Map<TransportModel>(transportModelDto);

            await _transportModelRepository.Add(transportBrand);
        }

        public async Task<ActionResult<IEnumerable<TransportModelDto>>> GetTransportModelsByBrand(int id)
        {
            var modelsByBrand = await _transportModelRepository.GetModelsByBrandId(id);
            
            var modelsByBrandDtos = modelsByBrand.Select(s => _mapper.Map<TransportModelDto>(s)).ToList();
            
            return modelsByBrandDtos;
        }
    }
}