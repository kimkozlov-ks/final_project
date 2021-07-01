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
        
        [HttpGet("filter")]
        public async Task<ActionResult<VehicleViewModel>> GetById(
            [FromQuery] VehicleFilterQueryParams vehicleFilterQueryParams,
            int page,
            int size)
        {
            var pageView =  await _vehicleService.GetFilteredVehicles(vehicleFilterQueryParams, page, size);

            return Ok(pageView);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SendVehicleDto>> GetById([FromRoute] int id)
        {
            return await _vehicleService.GetVehicleById(id);
        }
        
        [Authorize]
        [HttpGet("my")]
        public async Task<ActionResult<List<SendVehicleDto>>> GetByUserId([FromQuery] int page, int size)
        {    
            var userId = HttpContext.User.Claims
                .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)
                ?.Value; 
            
            var pageView =  await _vehicleService.GetUserVehicle(userId, page, size);
            
            return Ok(pageView);
        }
        
        [HttpGet("best")]
        public async Task<ActionResult<List<SendVehicleDto>>> GetBestOfTheDay()
        {

            var bestVehiclesOfTheDay = await _vehicleService.GetBestVehiclesOfTheDay();
            
            return Ok(bestVehiclesOfTheDay);
        }
        
        [Authorize]
        [HttpPost("add")] 
        public async Task<ActionResult<int>> AddVehicle([FromForm] AddVehicleDto addVehicleDto)
        {
            if (!ModelState.IsValid) return BadRequest();
                
            var userId = HttpContext.User.Claims
                .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)
                ?.Value;
            
            
            var res = await _vehicleService.Add(addVehicleDto, userId);

            if (res == null)
            {
                return Conflict();
            }
            
            return Ok(res.Id);
        }

        [Authorize]
        [HttpPost("edit")]
        public async Task<ActionResult> EditVehicle([FromForm] EditVehicleDto editVehicleDto)
        {
            if (!ModelState.IsValid) return BadRequest();

            var userId = HttpContext.User.Claims
                .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)
                ?.Value;

            var isEdited = await _vehicleService.Edit(editVehicleDto, userId);

            if (!isEdited)
            {
                return Conflict();
            }

            return Ok();
        }

        [Authorize(Roles = "Test")]
        [HttpDelete("{id}")] 
        public async Task<ActionResult> DeleteVehicle([FromRoute] int id)
        {
           var res = await _vehicleService.DeleteVehicle(id);

           if (res == null)
           {
               return Conflict();
           }
           
           return Ok();
        }
    }
}