using Entities.Class.Entities.TypesEntities;
using Garage.Types.Data;
using Infrastructure.Data.Repository;

namespace Garage.Types.API.Repositories
{
    public class TransportBrandRepository: AbstractRepository<TransportBrand, TypesDbContext>
    {
        public TransportBrandRepository(TypesDbContext context) : base(context)
        {
        }
    }
}