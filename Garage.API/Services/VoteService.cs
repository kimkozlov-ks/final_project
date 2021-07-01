using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Entities.Class.Entities.GarageEntities;
using Garage.API.dto;
using Garage.API.Repositories;

namespace Garage.API.Services
{
    public class VoteService
    {
        private readonly VoteRepository _voteRepository;
        private readonly VehicleRepository _vehicleRepository;     
        private readonly IMapper _mapper;

        public VoteService(VoteRepository voteRepository, VehicleRepository vehicleRepository, IMapper mapper)
        {
            _voteRepository = voteRepository;
            _vehicleRepository = vehicleRepository;
            _mapper = mapper;
        }
        
        public async Task<bool> AddVote(string userId, VoteDto vote)
        {
            bool isVoteExist =  _voteRepository.IsVoteExist(int.Parse(userId), vote.VehicleId);

            if (isVoteExist)
            {
                return false;
            }

            var voteEntity = _mapper.Map<VoteEntity>(vote, opt => 
            {
                opt.Items["userId"] = userId;
            });

            var isAddedVote = await _voteRepository.Add(voteEntity) != null;

            if (isAddedVote)
            {
                var vehicle = await _vehicleRepository.Get(vote.VehicleId);
                vehicle.Rating += 1;
                await _vehicleRepository.Update(vehicle);
            }

            return isAddedVote;
        }

        public bool IsVoted(int vehicleId, int userId)
        {
            return _voteRepository.IsVoted(userId, vehicleId);
        }
    }
}