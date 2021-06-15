using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities.Class.Entities.TypesEntities;
using Garage.Types.Data;
using Infrastructure.Data.Repository;
using Microsoft.EntityFrameworkCore;

namespace Garage.Types.API.Repositories
{
    public class TransportSubTypeRepository : AbstractRepository<TransportSubType, TypesDbContext>
    {
        public TransportSubTypeRepository(TypesDbContext context) : base(context)
        {
        }

        public async Task<List<TransportSubType>> GetSubTypesByType(int typeId)
        {
            return await GetDbContext().TransportSubTypes.Where(t => t.TransportTypeId == typeId).ToListAsync();
        }
    }
}