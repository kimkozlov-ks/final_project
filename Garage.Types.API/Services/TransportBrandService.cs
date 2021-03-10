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
        private readonly IMapper _mapper;

        public TransportBrandService(TransportBrandRepository transportBrandRepository, IMapper mapper)
        {
            _transportBrandRepository = transportBrandRepository;
            _mapper = mapper;
        }

        public async Task<ActionResult<IEnumerable<TransportBrandDto>>> GetTransportBrandes()
        {
            var transportBrands = await _transportBrandRepository.GetAll();

            var transportBrandDtos = transportBrands.Select(b => _mapper.Map<TransportBrandDto>(b)).ToList();
            
            return transportBrandDtos;
        }

        public async Task AddTransportBrand(TransportBrandAddDto transportBrandAddDto)
        {
            var transportBrand = _mapper.Map<TransportBrand>(transportBrandAddDto);

            await _transportBrandRepository.Add(transportBrand);
        }
    }
}