using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Auth.API.Model;
using Auth.API.Services;
using Auth.Data;
using Entities.Class.Entities.AuthEntities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Auth.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly AuthDbContext _context;
        private readonly AuthService _authService;

        public AuthController(IConfiguration configuration, AuthDbContext context, AuthService authService)
        {
            _configuration = configuration;
            _context = context;
            _authService = authService;
        }
        
        [HttpPost("login")]
        public async Task<ActionResult<ResponseAccessToken>> Login([FromBody] UserDto model)
        {    
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var identityUser = HttpContext.User;

            var user = await _context.Users
                .Include(u => u.RefreshToken)
                .Include(u => u.Role)
                .ThenInclude(r => r.RolePermissions)
                .FirstOrDefaultAsync(u => 
                    u.Username == model.Username &&
                    u.Password == model.Password);

            if (user == null) return Unauthorized();

            var accessToken = _authService.GenerateAccessToken(user);
            var newRefreshToken = Guid.NewGuid();

            if(user.RefreshToken == null)
            {
                user.RefreshToken = new RefreshToken
                {
                    Refresh = newRefreshToken,
                    UserId = user.Id
                };
            }
            else
            {
                user.RefreshToken.Refresh = newRefreshToken;
            }
            
            await _context.SaveChangesAsync();

            AddRefreshTokenCookie(newRefreshToken);
            return Ok(new ResponseAccessToken(accessToken));
        }
        
        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] UserDto userDto)
        {    
            var existedUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == userDto.Username);

            if (existedUser != null)
            {
                return Unauthorized();
            }
            
            User user = new User
            {
                Username = userDto.Username,
                Password = userDto.Password,
                Role = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "User")
            };
            
            user.Role.RolePermissions = await _context.RolePermissions
                .Select(p => p)
                .Where(rp => rp.RoleId == user.RoleId).ToListAsync();
            
            var newRefreshToken = Guid.NewGuid();

            if(user.RefreshToken == null)
            {
                user.RefreshToken = new RefreshToken
                {
                    Refresh = newRefreshToken,
                    UserId = user.Id
                };
            }
            else
            {
                user.RefreshToken.Refresh = newRefreshToken;
            }
            
            await _context.Users.AddAsync(user);
            var isSaved = await _context.SaveChangesAsync();

            if (isSaved == 0)
            {
                return Unauthorized();
            }

            AddRefreshTokenCookie(newRefreshToken);
            
            var accessToken = _authService.GenerateAccessToken(user);
            return Ok(new ResponseAccessToken(accessToken));
        }

        [HttpGet("logout")]
        public ActionResult Logout()
        {
            var refreshTokenStr = Request.Cookies["Refresh"];
            if(Guid.TryParse(refreshTokenStr, out var refreshToken))
            {
                Response.Cookies.Delete("Refresh");
            }
            
            return Ok();
        }
        
        [HttpGet("refresh")]
        public async Task<ActionResult<ResponseAccessToken>> Refresh()
        {
            var refreshTokenStr = Request.Cookies["Refresh"];

            if (!Guid.TryParse(refreshTokenStr, out var refreshToken)) return BadRequest();

            var existingToken = await _context.RefreshTokens
                .FirstOrDefaultAsync(rt => rt.Refresh == refreshToken);

            if (existingToken == null) return Unauthorized();

            var userIdClaim = HttpContext.User.Claims
                .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)
                ?.Value;
            
            if (!int.TryParse(userIdClaim, out int userId)
                || existingToken.UserId != userId)
            {
                return Unauthorized();
            }

            var user = await _context.Users
                .Include(u => u.RefreshToken)
                .Include(u => u.Role)
                .ThenInclude(r => r.RolePermissions)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null) return Unauthorized();

            var accessToken = _authService.GenerateAccessToken(user);
            var newRefreshToken = Guid.NewGuid();

            user.RefreshToken.Refresh = newRefreshToken;
            await _context.SaveChangesAsync();

            AddRefreshTokenCookie(newRefreshToken);
            return Ok(new ResponseAccessToken(accessToken));
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser([FromRoute] int id)
        {
            var userId = HttpContext.User.Claims
                .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)
                ?.Value;

            if (userId == null || int.Parse(userId) != id)
            {
                return Conflict();
            }

            return Ok(await _authService.DeleteUser(id));
        }
       
        private void AddRefreshTokenCookie(Guid refreshToken)
        {
            Response.Cookies
                .Append("Refresh", refreshToken.ToString(), new CookieOptions
                {
                    HttpOnly = true,
                    Expires = DateTime.Now.AddDays(100)
                });
        }
    }
}