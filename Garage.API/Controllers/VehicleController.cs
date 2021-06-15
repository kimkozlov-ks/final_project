using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Garage.API.dto;
using Garage.API.Models;
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

        [HttpGet("")]
        public async Task<ActionResult<VehicleViewModel>> GetById([FromQuery] int page, int size)
        {
            var pageView =  await _vehicleService.GetVehicles(page, size);

            return Ok(pageView);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AddVehicleDto>> GetById([FromRoute] int id)
        {
            return await _vehicleService.GetVehicleById(id);
        }
        
        [HttpGet("my")]
        public async Task<ActionResult<List<SendVehicleDto>>> GetByUserId([FromQuery] int page, int size)
        {    
            var userId = HttpContext.User.Claims
                .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)
                ?.Value; 
            
            var pageView =  await _vehicleService.GetUserVehicle(userId, page, size);
            
            return Ok(pageView);
        }
        
        [HttpPost("add")] 
        public async Task<ActionResult<AddVehicleDto>> AddVehicle([FromForm] AddVehicleDto addVehicleDto)
        {
            if (!ModelState.IsValid) return BadRequest();
                
            var userId = HttpContext.User.Claims
                .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)
                ?.Value;
            
            await _vehicleService.Add(addVehicleDto, userId);
            
            return Ok();
        }

    }
}