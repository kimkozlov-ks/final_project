using System;
using System.Collections.Generic;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Auth.API.Model;
using Entities.Class.Entities.AuthEntities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Xunit;

namespace Garage.Tests
{
    public class VehicleControllerTests
    {
        private readonly HttpClient _garageApiClient;

        public VehicleControllerTests()
        {

            var server = new TestServer(new WebHostBuilder()
                .UseStartup<Garage.API.Startup>()
                .UseConfiguration(new ConfigurationBuilder()
                    .AddJsonFile(
                        "appsettings.json") 
                    .Build()
                )
                .UseWebRoot("images"));
            _garageApiClient = server.CreateClient();
            _garageApiClient.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", GenerateAccessToken());
        }

        [Fact]
        public async Task VehicleCrudTest()
        {
            using var form = new MultipartFormDataContent();
            var bytefile = new byte[1];
            var fileContent = new ByteArrayContent(bytefile);
            fileContent.Headers.ContentType = MediaTypeHeaderValue.Parse("multipart/form-data");
            form.Add(fileContent, "Image", Path.GetFileName("1.jpg"));
            
            form.Add(new StringContent("Nickname"), "Nickname");
            form.Add(new StringContent("Description"), "Description");
            form.Add(new StringContent("2"), "TransportTypeId");
            form.Add(new StringContent("4"), "TransportSubTypeId");
            form.Add(new StringContent("1"), "TransportBrandId");
            form.Add(new StringContent("1"), "TransportModelId");
            var postActionResult = await _garageApiClient.PostAsync("api/vehicle/add", form);

            Assert.NotNull(postActionResult);
            Assert.True(postActionResult.StatusCode == HttpStatusCode.OK);

            var id = JsonConvert.DeserializeObject<int>(await postActionResult.Content.ReadAsStringAsync().ConfigureAwait(false));

            var getActionResult = await _garageApiClient.GetAsync($"api/vehicle/{id}");
            
            Assert.NotNull(getActionResult);
            Assert.True(getActionResult.StatusCode == HttpStatusCode.OK);

            using var editForm = new MultipartFormDataContent();
            var bytefile1 = new byte[1];
            var fileContent1 = new ByteArrayContent(bytefile1);
            fileContent1.Headers.ContentType = MediaTypeHeaderValue.Parse("multipart/form-data");
            editForm.Add(new StringContent("Nickname2"), "Nickname");
            editForm.Add(new StringContent("Description2"), "Description");
            editForm.Add(new StringContent("2"), "TransportTypeId");
            editForm.Add(new StringContent("4"), "TransportSubTypeId");
            editForm.Add(new StringContent("1"), "TransportBrandId");
            editForm.Add(new StringContent("1"), "TransportModelId");
            editForm.Add(new StringContent($"{id}"), "Id");
            var editActionResult = await _garageApiClient.PostAsync("api/vehicle/edit", editForm);
            
            Assert.NotNull(editActionResult);
            Assert.True(editActionResult.StatusCode == HttpStatusCode.OK);

            var deleteActionResult = await _garageApiClient.DeleteAsync($"api/vehicle/{id}");
            
            Assert.NotNull(deleteActionResult);
            Assert.True(deleteActionResult.StatusCode == HttpStatusCode.OK);
        }

        private string GenerateAccessToken()
        {
            var user = new User()
            {
                Username = "Test1234",
                Password = "Test1234",
                Id = 5,
                Role = new Role(){ Name = "Test"}
            };
            
            var issuer = "Auth";
            var audience = "localhost";
            
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
                    Encoding.UTF8.GetBytes("Secret12345678910")),
                SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = issuer,
                Audience = audience,

                IssuedAt = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddMinutes(60),

                Subject = subject,
                SigningCredentials = signingCredentials
            };

            var handler = new JwtSecurityTokenHandler();

            var jwtToken = handler.CreateJwtSecurityToken(tokenDescriptor);
            return handler.WriteToken(jwtToken);
        }
    }
}