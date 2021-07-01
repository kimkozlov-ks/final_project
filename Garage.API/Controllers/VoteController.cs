using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
    public class VoteController : Controller
    {
        private readonly VoteService _voteService;

        public VoteController(VoteService voteService)
        {
            _voteService = voteService;
        }

        [HttpPost]
        public async Task<ActionResult> AddVote([FromBody] VoteDto vote)
        {
            var userId = HttpContext.User.Claims
                .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)
                ?.Value;
            
            var res = await _voteService.AddVote(userId, vote);

            if (!res)
            {
                return Conflict();
            }
            
            return Ok();
        }
    }
}