using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Auth.API.Model;
using Auth.Data;
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

        public AuthController(IConfiguration configuration, AuthDbContext context)
        {
            _configuration = configuration;
            _context = context;
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

            var accessToken = GenerateAccessToken(user);
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

        [HttpPost("logout")]
        public async Task<ActionResult> Logout([FromBody] UserDto model)
        {
            var refreshTokenStr = Request.Cookies["Refresh"];
            if(Guid.TryParse(refreshTokenStr, out var refreshToken))
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                var identityUser = HttpContext.User;

                var user = await _context.Users
                    .Include(u => u.RefreshToken)
                    .Include(u => u.Role)
                    .ThenInclude(r => r.RolePermissions)
                    .FirstOrDefaultAsync(u => 
                        u.Username == model.Username);

                if (user.RefreshToken != null && user.RefreshToken.Refresh == refreshToken)
                {
                    Response.Cookies.Delete("Refresh");
                }
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

            var accessToken = GenerateAccessToken(user);
            var newRefreshToken = Guid.NewGuid();

            user.RefreshToken.Refresh = newRefreshToken;
            await _context.SaveChangesAsync();

            AddRefreshTokenCookie(newRefreshToken);
            return Ok(new ResponseAccessToken(accessToken));
        }
        
        private string GenerateAccessToken(User user)
        {

            var issuer = _configuration["Issuer"] ?? throw new ArgumentException();
            var audience = _configuration["Audience"] ?? throw new ArgumentException();

            var subject = new ClaimsIdentity(new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Role.Name)
                    
                }.Concat(user.Role.RolePermissions
                     .Select(p => 
                         new Claim("Permission", ((int)p.PermissionType).ToString()))));
            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(_configuration["JwtTokenSecret"])),
                SecurityAlgorithms.HmacSha256Signature);
                
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = issuer,
                Audience = audience,

                IssuedAt = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddMinutes(_configuration.GetValue<int>("TokenExpiryDuration")),

                Subject = subject,
                SigningCredentials = signingCredentials
            };

            var handler = new JwtSecurityTokenHandler();
            
            var jwtToken = handler.CreateJwtSecurityToken(tokenDescriptor);
            return handler.WriteToken(jwtToken);
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