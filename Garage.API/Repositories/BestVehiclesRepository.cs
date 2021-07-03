using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities.Class.Entities.GarageEntities;
using Garage.Data;
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

        public async Task RemoveByDate(DateTime date)
        {
            var bestByDate = await GetDbContext().BestVehicles
                .Where(v => 
                    v.DayOfBest == date).ToListAsync();
            
            GetDbContext().BestVehicles.RemoveRange(bestByDate);
        }
    }
}