using System.Collections.Generic;
using System.Threading.Tasks;
using Garage.Types.API.Dto;
using Garage.Types.API.Services;
using Garage.Types.Data.Model;
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

        [HttpPost("add")] 
        public async Task<IActionResult> AddTransportBrand([FromBody] TransportBrandAddDto transportBrandAddDto)
        {
            if (!ModelState.IsValid) return BadRequest();

            await _transportBrandService.AddTransportBrand(transportBrandAddDto);
            
            return Ok();
        }
    }
}