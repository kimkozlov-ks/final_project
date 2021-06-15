using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Garage.Data;
using Garage.Data.Entity;
using Garage.Types.Data;
using Garage.Types.Data.Model;
using Infrastructure.Data.Repository;
using Microsoft.EntityFrameworkCore;

namespace Garage.API.Repositories
{
    public class VehicleRepository: AbstractRepository<VehicleEntity, VehicleDbContext>
    {
        public VehicleRepository(VehicleDbContext context) : base(context)
        {
        }

        public async Task<List<VehicleEntity>> GetUserVehicles(int userId)
        {
            return await GetDbContext().Vehicles.Where(v => v.OwnerUserId == userId).ToListAsync();
        }

        public int Count()
        {
            return GetDbContext().Vehicles.Count();
        }

        public async Task<List<VehicleEntity>> GetPage(int page, int size)
        {
            return await GetDbContext().Vehicles.OrderBy(v => v.CreateDate). 
                Skip((page - 1) * size).Take(size).ToListAsync();
        }
        
        public async Task<List<VehicleEntity>> GetBestVehiclesFromYesterday()
        {
            return await GetDbContext().Vehicles.Where(v =>
                v.CreateDate.Day == (DateTime.Now.Day - 1) && v.Rating == GetDbContext().Vehicles.Where(ve =>
                    ve.CreateDate.Day == (DateTime.Now.Day - 1)).Max(ve2 => ve2.Rating)).ToListAsync();
        }
    }
}