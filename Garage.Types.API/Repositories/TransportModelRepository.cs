using Garage.Types.Data;
using Garage.Types.Data.Model;
using Infrastructure.Data.Repository;

namespace Garage.Types.API.Repositories
{
    public class TransportModelRepository: AbstractRepository<TransportModel, TypesDbContext>
    {
        public TransportModelRepository(TypesDbContext context) : base(context)
        {
        }
    }
}