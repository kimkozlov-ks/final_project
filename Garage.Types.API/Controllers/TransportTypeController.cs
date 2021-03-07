using System.Collections.Generic;
using Garage.Types.Data.Model;
using Microsoft.AspNetCore.Mvc;

namespace Garage.Types.API.Controllers
{
    public class TransportTypeController : Controller
    {
        [HttpGet]
        public IActionResult<IEnumerable<TransportType>> GetTransportTypes()
        {
            
            
            return ;
        }

        [HttpPost]
        public IActionResult AddTransportType()
        {

            return;
        }
    }
}