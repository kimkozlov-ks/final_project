using System.Collections.Generic;
using System.Threading.Tasks;
using Garage.Types.API.Dto;
using Garage.Types.API.Repositories;
using Garage.Types.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Garage.Types.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransportModelController : Controller
    {
        private readonly TransportModelService _transportModelService;

        public TransportModelController(TransportModelService transportModelService)
        {
            _transportModelService = transportModelService;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("add")] 
        public async Task<IActionResult> AddTransportSubType([FromBody] TransportModelDto transportModelDto)
        {
            if (!ModelState.IsValid) return BadRequest();

            var addedModel = await _transportModelService.AddTransportModel(transportModelDto);

            return Ok(addedModel);
        }
        
        [HttpGet("brand/{id}")]
        public async Task<ActionResult<IEnumerable<TransportModelDto>>> GetTransportSubTypesByTypeId([FromRoute] int id)
        {
            return await _transportModelService.GetTransportModelsByBrand(id);
        }
        
        [Authorize(Roles = "Admin")]
        [HttpPut("edit")] 
        public async Task<IActionResult> EditTransportSubType([FromBody] TransportModelDto transportModelDto)
        {
            if (!ModelState.IsValid) return BadRequest();

            await _transportModelService.EditModel(transportModelDto);
            
            return Ok();
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<TransportModelDto>> GetTransportModelById([FromRoute] int id)
        {
            return await _transportModelService.GetTransportModel(id);
        }
    }
}