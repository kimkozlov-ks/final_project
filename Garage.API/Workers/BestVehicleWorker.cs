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

namespace Garage.API.Workers
{
    public class BestVehicleWorker: BackgroundService
    {
        private readonly IServiceProvider _service;
        private readonly IMapper _mapper;
        
        public BestVehicleWorker(IServiceProvider service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            do
            {
                if (DateTime.Now.Hour == 0)
                {
                    using ( var scope = _service.CreateScope() )
                    {
                        var vehicleRepository = scope.ServiceProvider.GetRequiredService<VehicleRepository>();
                        var bestVehicles = await vehicleRepository.GetBestVehiclesFromYesterday();
                        var bestVehicleRepository = scope.ServiceProvider.GetRequiredService<BestVehiclesRepository>();
                        var bestVehiclesMapped =
                            bestVehicles.Select(bV => 
                                _mapper.Map<BestVehicleEntity>(bV)).ToList();
                        foreach (var bV in bestVehiclesMapped)
                            await bestVehicleRepository.Add(bV);
                    }
                    
                    await Task.Delay(TimeSpan.FromHours(23), stoppingToken);
                }
                
                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
            }
            while (!stoppingToken.IsCancellationRequested);
        }

    }
}