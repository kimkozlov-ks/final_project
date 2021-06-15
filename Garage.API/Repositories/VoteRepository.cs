using System.Linq;
using Garage.Data;
using Garage.Data.Entity;
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
                v.UserId == userId && v.VehicleId == vehicleId);
            
            return  vote != null;
        }
    }
}