using System.Collections.Generic;
using System.Threading.Tasks;
using Garage.Types.API.Dto;
using Garage.Types.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Garage.Types.API.Controllers
{    
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class TransportTypeController : Controller
    {
        private readonly TransportTypeService _transportTypeService;

        public TransportTypeController(TransportTypeService transportTypeService)
        {
            _transportTypeService = transportTypeService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransportTypeDto>>> GetTransportTypes()
        {    
            var transportTypeDtos = await _transportTypeService.GetTransportTypes();
            return Ok(transportTypeDtos);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("add")] 
        public async Task<ActionResult<TransportTypeDto>> AddTransportType([FromBody] TransportTypeAddDto transportTypeAddDto)
        {
            if (!ModelState.IsValid) return BadRequest();
            
            return Ok(await _transportTypeService.AddTransportType(transportTypeAddDto));
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<TransportSubTypeDto>>> GetTransportSubTypesByTypeId([FromRoute] int id)
        {
            return await _transportTypeService.GetTransportSubTypesByTypeId(id);
        }
        
        [Authorize(Roles = "Admin")]
        [HttpPost("subtype/add")] 
        public async Task<ActionResult<TransportSubTypeDto>> AddTransportSubType([FromBody] TransportSubTypeAddDto transportSubTypeAddDto)
        {
            if (!ModelState.IsValid) return BadRequest();
            
            return  await _transportTypeService.AddTransportSubType(transportSubTypeAddDto);
        }    
        
        [Authorize(Roles = "Admin")]
        [HttpPut("subtype/edit")] 
        public async Task<IActionResult> EditTransportSubType([FromBody] TransportSubTypeAddDto transportSubTypeAddDto)
        {
            if (!ModelState.IsValid) return BadRequest();

            await _transportTypeService.EditTransportSubType(transportSubTypeAddDto);
            
            return Ok();
        }
    }
}