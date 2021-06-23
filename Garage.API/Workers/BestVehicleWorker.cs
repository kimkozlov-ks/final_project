using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Entities.Class.Entities.GarageEntities;
using Garage.API.Repositories;
using Garage.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Quartz;

namespace Garage.API.Workers
{
    public class BestVehicleWorker: IJob
    {
        private readonly IServiceProvider _service;
        private readonly IMapper _mapper;
        
        public BestVehicleWorker(IServiceProvider service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            using var scope = _service.CreateScope();
            
            var voteRepository = scope.ServiceProvider.GetRequiredService<VoteRepository>();
            var bestVehiclesId = await voteRepository.GetBestVehiclesIdFromYesterday();
            var vehicleRepository = scope.ServiceProvider.GetRequiredService<VehicleRepository>();
            var bestVehicles = await vehicleRepository.GetByListIds(bestVehiclesId);
            var bestVehicleRepository = scope.ServiceProvider.GetRequiredService<BestVehiclesRepository>();
            var bestVehiclesMapped =
                bestVehicles.Select(bV => 
                    _mapper.Map<BestVehicleEntity>(bV)).ToList();
            foreach (var bV in bestVehiclesMapped)
                await bestVehicleRepository.Add(bV);
        }
    }
}