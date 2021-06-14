using System.Collections.Generic;
using System.Threading.Tasks;
using Garage.API.dto;
using Garage.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Garage.API.Controllers
{    
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class VehicleController : Controller
    {    
        private readonly VehicleService _vehicleService;

        public VehicleController(VehicleService vehicleService)
        {
            _vehicleService = vehicleService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleDto>> GetById([FromRoute] int id)
        {
            return await _vehicleService.GetVehicleById(id);
        }
        
        [HttpPost("add")] 
        public async Task<ActionResult<VehicleDto>> AddVehicle([FromForm] VehicleDto vehicleDto)
        {
            if (!ModelState.IsValid) return BadRequest();

            await _vehicleService.Add(vehicleDto);
            
            return Ok();
        }

    }
}