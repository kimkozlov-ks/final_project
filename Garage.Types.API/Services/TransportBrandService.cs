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
    public class TransportBrandService
    {
        private readonly TransportBrandRepository _transportBrandRepository;
        private readonly TransportModelRepository _transportModelRepository;
        private readonly IMapper _mapper;

        public TransportBrandService(TransportBrandRepository transportBrandRepository, IMapper mapper, TransportModelRepository transportModelRepository)
        {
            _transportBrandRepository = transportBrandRepository;
            _mapper = mapper;
            _transportModelRepository = transportModelRepository;
        }

        public async Task<ActionResult<IEnumerable<TransportBrandDto>>> GetTransportBrandes()
        {
            var transportBrands = await _transportBrandRepository.GetAll();
            
            foreach (var transportBrand in transportBrands)
            {
                transportBrand.Models = await _transportModelRepository.GetModelsByBrandId(transportBrand.Id);
            }
            
            var transportBrandDtos = transportBrands.Select(b => _mapper.Map<TransportBrandDto>(b)).ToList();
            
            return transportBrandDtos;
        }

        public async Task<TransportBrandDto> AddTransportBrand(TransportBrandAddDto transportBrandAddDto)
        {
            var transportBrand = _mapper.Map<TransportBrand>(transportBrandAddDto);

            var addedBrand = await _transportBrandRepository.Add(transportBrand);

            var addedBrandDto = _mapper.Map<TransportBrandDto>(addedBrand);
            
            return addedBrandDto;
        }
    }
}