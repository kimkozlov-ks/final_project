using Garage.Types.Data;
using Garage.Types.Data.Model;
using Infrastructure.Data.Repository;

namespace Garage.Types.API.Repositories
{
    public class TransportTypeRepository : AbstractRepository<TransportType, TypesDbContext>
    {
        public TransportTypeRepository(TypesDbContext context) : base(context)
        {
        }
    }
}