using System.Collections.Generic;
using System.Threading.Tasks;
using Garage.Types.API.Dto;
using Garage.Types.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Garage.Types.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransportBrandController : Controller
    {
        private readonly TransportBrandService _transportBrandService;

        public TransportBrandController(TransportBrandService transportBrandService)
        {
            _transportBrandService = transportBrandService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransportBrandDto>>> GetTransportBrandes()
        {
            return await _transportBrandService.GetTransportBrandes();
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<TransportBrandDto>> GetTransportBrandById([FromRoute] int id)
        {
            return await _transportBrandService.GetTransportBrand(id);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("add")] 
        public async Task<IActionResult> AddTransportBrand([FromBody] TransportBrandAddDto transportBrandAddDto)
        {
            if (!ModelState.IsValid) return BadRequest();

            var addedBrand = await _transportBrandService.AddTransportBrand(transportBrandAddDto);
            
            return Ok(addedBrand);
        }
    }
}