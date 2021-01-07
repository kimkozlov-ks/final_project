using System.Threading.Tasks;
using AutoMapper;
using Map.API.Model;
using Map.Data;

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

        public async Task AddRoute(RouteDto routeDto)
        {
            var route = _mapper.Map<Route>(routeDto);

            var res = await _mapDbContext.Routes.AddAsync(route);
            await _mapDbContext.SaveChangesAsync();
        }
    }
}