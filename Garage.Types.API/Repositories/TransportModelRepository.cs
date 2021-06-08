using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Garage.Types.Data;
using Garage.Types.Data.Model;
using Infrastructure.Data.Repository;
using Microsoft.EntityFrameworkCore;

namespace Garage.Types.API.Repositories
{
    public class TransportModelRepository: AbstractRepository<TransportModel, TypesDbContext>
    {
        public TransportModelRepository(TypesDbContext context) : base(context)
        {
        }
        
        public async Task<List<TransportModel>> GetModelsByBrandId(int typeId)
        {
            return await GetDbContext().TransportModels.Where(t => t.TransportBrandId == typeId).ToListAsync();
        }

    }
}