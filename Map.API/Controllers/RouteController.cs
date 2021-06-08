using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Map.API.Model;
using Map.API.Services;
using Map.Data;
using Microsoft.AspNetCore.Mvc;

namespace Map.API.Controllers
{    
    
    [ApiController]
    [Route("api/[controller]")]
    public class RouteController : ControllerBase
    {    
        private readonly RouteService _routeService;

        public RouteController(RouteService routeService)
        {
            _routeService = routeService;
        }

        [HttpGet("all")]
        public async Task<List<RouteDto>> GetAllRoutes()
        {
           
            
            var routes = await _routeService.GetRoutesAsync("");

            return routes;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddRoute([FromBody] RouteDto routeDto)
        {
            if (!ModelState.IsValid) return BadRequest();
            
            var identityUser = HttpContext.User;

            var userId = identityUser.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            
            await _routeService.AddRoute(routeDto, userId);

            return Ok();
        }
    }
}