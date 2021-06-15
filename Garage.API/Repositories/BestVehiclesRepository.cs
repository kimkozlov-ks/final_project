using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Garage.Data;
using Garage.Data.Entity;
using Infrastructure.Data.Repository;
using Microsoft.EntityFrameworkCore;

namespace Garage.API.Repositories
{
    public class BestVehiclesRepository: AbstractRepository<BestVehicleEntity, VehicleDbContext>
    {
        public BestVehiclesRepository(VehicleDbContext context) : base(context)
        {
        }

        public async Task<List<BestVehicleEntity>> GetBestOfTheDay()
        {
            var yesterday = DateTime.Now.Date.AddDays(-1);
            return await GetDbContext().BestVehicles.Where(v =>
                v.DayOfBest.Date.Equals(yesterday)).Include(i => 
                    i.VehicleEntity).ToListAsync();
        }
    }
}