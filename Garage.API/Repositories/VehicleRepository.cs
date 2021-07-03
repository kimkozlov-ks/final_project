using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Entities.Class.Entities.GarageEntities;
using Garage.API.Models;
using Garage.Data;
using Garage.Types.Data;
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
            return await GetDbContext().Vehicles.Where(v => v.UserId == userId).ToListAsync();
        }
        
        public async Task<List<VehicleEntity>> GetByListIds(List<int> ids)
        {
            return await GetDbContext().Vehicles.Where(v => ids.Contains(v.Id)).ToListAsync();
        }

        public int Count()
        {
            return GetDbContext().Vehicles.Count();
        }

        public async Task<List<VehicleEntity>> GetPage(int page, int size)
        {
            return await GetDbContext().Vehicles
                .OrderBy(v => v.CreateDate)
                .Skip((page - 1) * size)
                .Take(size)
                .ToListAsync();
        }
        
        public async Task<int> GetFilteredCount(Expression<Func<VehicleEntity, bool>> filter)
        {
            return await GetDbContext().Vehicles
                .Where(filter)
                .CountAsync();
        }
        
        public async Task<List<VehicleEntity>> GetFiltered(Expression<Func<VehicleEntity, bool>> filter, int page, int size)
        {
            return await GetDbContext().Vehicles
                .Where(filter) 
                .Skip((page - 1) * size)
                .Take(size)
                .ToListAsync();;
        }
    }
}