using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Garage.Types.API.Dto;
using Garage.Types.API.Repositories;

namespace Garage.Types.API.Services
{
    public class TransportTypeService
    {
        private readonly TransportTypeRepository _transportTypeRepository;
        private readonly IMapper _mapper;

        public TransportTypeService(TransportTypeRepository transportTypeRepository, IMapper mapper)
        {
            _transportTypeRepository = transportTypeRepository;
            _mapper = mapper;
        }

        async Task<List<TransportTypeDto>> GetTransportTypes()
        {
            var transportTypes = await _transportTypeRepository.GetAll();

            var transportTypesDtos = transportTypes.Select(t => _mapper.Map<TransportTypeDto>(t)).ToList();
            
            return transportTypesDtos;
        }
    }
}