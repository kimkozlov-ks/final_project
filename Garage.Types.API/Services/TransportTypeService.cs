using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Garage.Types.API.Dto;
using Garage.Types.API.Repositories;
using Garage.Types.Data;
using Garage.Types.Data.Model;
using Microsoft.AspNetCore.Mvc;

namespace Garage.Types.API.Services
{
    public class TransportTypeService
    {
        private readonly TransportTypeRepository _transportTypeRepository;
        private readonly TransportSubTypeRepository _transportSubTypeRepository;
        private readonly IMapper _mapper;

        public TransportTypeService(TransportTypeRepository transportTypeRepository, IMapper mapper, TransportSubTypeRepository transportSubTypeRepository, TypesDbContext dbContext)
        {
            _transportTypeRepository = transportTypeRepository;
            _mapper = mapper;
            _transportSubTypeRepository = transportSubTypeRepository;
        }

        public async Task<List<TransportTypeDto>> GetTransportTypes()
        {
            var transportTypes = await _transportTypeRepository.GetAll();
            
            return transportTypes.Select(t => _mapper.Map<TransportTypeDto>(t)).ToList();
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

        public async Task<ActionResult<IEnumerable<TransportSubTypeDto>>> GetTransportSubTypesByTypeId(int id)
        {
            var transportSubTypes = await _transportSubTypeRepository.GetSubTypesByType(id);
            
            var transportSubTypeDtos = transportSubTypes.Select(s => _mapper.Map<TransportSubTypeDto>(s)).ToList();
            
            return transportSubTypeDtos;
        }

        public async Task EditTransportSubType(TransportSubTypeAddDto transportSubTypeAddDto)
        {
            var transportSubType = await _transportSubTypeRepository.Get(transportSubTypeAddDto.Id);

            if (transportSubType == null)
            {
                return;
            }

            transportSubType.Name = transportSubTypeAddDto.Name;
            
            await _transportSubTypeRepository.Update(transportSubType);
        }
    }
}