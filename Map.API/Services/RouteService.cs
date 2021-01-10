using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Map.API.Model;
using Map.Data;
using Microsoft.EntityFrameworkCore;

namespace Map.API.Services
{
    public class RouteService
    {
        private readonly IMapper _mapper;
        private readonly MapDbContext _mapDbContext;

        public RouteService(MapDbContext mapDbContext, IMapper mapper)
        {
            _mapDbContext = mapDbContext;
            _mapper = mapper;
        }

        public async Task AddRoute(RouteDto routeDto, string userId)
        {
            var route = _mapper.Map<Route>(routeDto);

            var savedRoute = await _mapDbContext.Routes.AddAsync(route);
            await _mapDbContext.SaveChangesAsync();
            
            if (int.TryParse(userId, out int id))
            {
                await _mapDbContext.UserRoutes.AddAsync(new UserRoute()
                {
                    RouteId = savedRoute.Entity.Id,
                    UserId = id
                });
            }
            await _mapDbContext.SaveChangesAsync();
        }

        public async Task<List<RouteDto>> GetRoutesAsync(string value)
        {
            var routes = await _mapDbContext.Routes.ToListAsync();

            var routesDto = routes.Select(r => _mapper.Map<RouteDto>(r)).ToList();
            
            return routesDto;
        }
    }
}