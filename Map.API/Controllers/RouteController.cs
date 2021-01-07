using System.Collections.Generic;
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

        // [HttpGet("all")]
        // public async Task<List<RouteDto>> GetAllRoutes()
        // {    
        //     //
        //     
        //     return );
        // }

        [HttpPost("add")]
        public async Task<IActionResult> AddRoute([FromBody] RouteDto routeDto)
        {
            if (!ModelState.IsValid) return BadRequest();

            await _routeService.AddRoute(routeDto);

            return Ok();
        }
    }
}