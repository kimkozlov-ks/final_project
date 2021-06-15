using Entities.Class.Entities.TypesEntities;
using Garage.Types.Data;
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