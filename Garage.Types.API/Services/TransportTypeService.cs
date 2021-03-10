using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Garage.Types.API.Dto;
using Garage.Types.API.Repositories;
using Garage.Types.Data.Model;

namespace Garage.Types.API.Services
{
    public class TransportTypeService
    {
        private readonly TransportTypeRepository _transportTypeRepository;
        private readonly TransportSubTypeRepository _transportSubTypeRepository;
        private readonly IMapper _mapper;

        public TransportTypeService(TransportTypeRepository transportTypeRepository, IMapper mapper, TransportSubTypeRepository transportSubTypeRepository)
        {
            _transportTypeRepository = transportTypeRepository;
            _mapper = mapper;
            _transportSubTypeRepository = transportSubTypeRepository;
        }

        public async Task<List<TransportType>> GetTransportTypes()
        {
            var transportTypes = await _transportTypeRepository.GetAll();
            
            return transportTypes;
        }

        public async Task AddTransportType(TransportTypeAddDto transportTypeAddDto)
        {
            var transportType = _mapper.Map<TransportType>(transportTypeAddDto);

            await _transportTypeRepository.Add(transportType);
        }

        public async Task AddTransportSubType(TransportSubTypeAddDto transportSubTypeAddDto)
        {
            var transportSubType = _mapper.Map<TransportSubType>(transportSubTypeAddDto);
            
            await _transportSubTypeRepository.Add(transportSubType);
        }
    }
}