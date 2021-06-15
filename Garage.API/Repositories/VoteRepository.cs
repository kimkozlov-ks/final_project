using System.Linq;
using Entities.Class.Entities.GarageEntities;
using Garage.Data;
using Infrastructure.Data.Repository;

namespace Garage.API.Repositories
{
    public class VoteRepository: AbstractRepository<VoteEntity, VehicleDbContext>
    {
        public VoteRepository(VehicleDbContext context) : base(context)
        {
        }

        public bool isVoteExist(int userId, int vehicleId)
        {
            var vote = GetDbContext().Votes.FirstOrDefault(v =>
                v.UserId == userId && v.VehicleEntityId == vehicleId);
            
            return  vote != null;
        }
    }
}