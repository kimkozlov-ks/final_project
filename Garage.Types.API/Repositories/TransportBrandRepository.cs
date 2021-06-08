using Garage.Types.Data;
using Garage.Types.Data.Model;
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