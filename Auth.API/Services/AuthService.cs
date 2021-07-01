using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Entities.Class.Entities.AuthEntities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Auth.API.Services
{
    public class AuthService
    {
        private readonly IConfiguration _configuration;

        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GenerateAccessToken(User user)
        {
            var issuer = _configuration["Issuer"] ?? throw new ArgumentException();
            var audience = _configuration["Audience"] ?? throw new ArgumentException();

            var subject = new ClaimsIdentity(new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role.Name)

            });
            // .Concat(user.Role.RolePermissions
            //      .Select(p => 
            //          new Claim("Permission", ((int)p.PermissionType).ToString()))));
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

    }
}