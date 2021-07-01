using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Threading.Tasks;
using Entities.Class.Entities.GarageEntities;
using Garage.Data;
using Infrastructure.Data.Repository;
using Microsoft.EntityFrameworkCore;

namespace Garage.API.Repositories
{
    public class VoteRepository: AbstractRepository<VoteEntity, VehicleDbContext>
    {
        public VoteRepository(VehicleDbContext context) : base(context)
        {
        }

        public bool IsVoteExist(int userId, int vehicleId)
        {
            var vote = GetDbContext().Votes.FirstOrDefault(v =>
                v.UserId == userId && v.VehicleEntityId == vehicleId);
            
            return  vote != null;
        }

        public async Task<List<int>> GetBestVehiclesIdFromYesterday()
        {    
            var yesterday = DateTime.Now.Date.AddDays(-1);

            var vehiclesId = await GetDbContext().Votes
                .Where(v => v.VoteTime.Date.Equals(yesterday))
                .GroupBy(v2 => v2.VehicleEntityId)
                .Select(group => new
                {
                    vehicleId = group.Key,
                    votes = group.Sum(v => v.Power)
                })
                .ToListAsync();

            return vehiclesId
                .Where(v => 
                    v.votes == vehiclesId.Max(v2 => 
                        v2.votes))
                .Select(v => v.vehicleId) 
                .ToList();
        }

        public bool IsVoted(int userId, int vehicleId)
        {
            return  GetDbContext().Votes.FirstOrDefault(v =>
                v.UserId == userId && v.VehicleEntityId == vehicleId) != null;
        }
    }
}