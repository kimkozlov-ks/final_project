using System.Collections.Generic;
using System.Threading.Tasks;
using Garage.Types.API.Services;
using Garage.Types.Data.Model;
using Microsoft.AspNetCore.Mvc;

namespace Garage.Types.API.Controllers
{    
    [ApiController]
    [Route("api/[controller]")]
    public class TransportTypeController : Controller
    {
        private readonly TransportTypeService _transportTypeService;

        public TransportTypeController(TransportTypeService transportTypeService)
        {
            _transportTypeService = transportTypeService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransportType>>> GetTransportTypes()
        {
            return await _transportTypeService.GetTransportTypes();
        }

        // [HttpPost]
        // public IActionResult AddTransportType()
        // {
        //
        //     return;
        // }
    }
}