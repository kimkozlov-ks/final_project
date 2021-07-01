using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Auth.API.Model;
using Entities.Class.Entities.AuthEntities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Xunit;

namespace Garage.Tests
{
    public class AuthIntegralTests
    {
        private readonly HttpClient _authHttpClient;

        public AuthIntegralTests()
        {
            var server = new TestServer(new WebHostBuilder()
                .UseStartup<Auth.API.Startup>()
                .UseConfiguration(new ConfigurationBuilder()
                    .AddJsonFile(
                        "appsettings.json")
                    .Build()
                ));
            _authHttpClient = server.CreateClient();
            // _authHttpClient.DefaultRequestHeaders.Authorization =
            //     new AuthenticationHeaderValue("Bearer", GenerateAccessToken());
        }

        [Fact]
        public async Task AuthRegisterTest()
        {
            var user = new UserDto()
            {
                Username = "testtest",
                Password = "testtest"
            };
            
            var content = new StringContent(
                JsonConvert.SerializeObject(user), 
                Encoding.UTF8, 
                "application/json");
            var registerResponse = await _authHttpClient
                .PostAsync("api/auth/register", content);
            
            Assert.NotNull(registerResponse);
            Assert.True(registerResponse.StatusCode == HttpStatusCode.OK);
            
            var accessToken = JsonConvert.DeserializeObject<ResponseAccessToken>(
                await registerResponse.Content
                    .ReadAsStringAsync()
                    . ConfigureAwait(false));
            
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(accessToken.Value);

            var userId = token
                .Claims.First(c => c.Type == "nameid").Value;

            using var requestMessage =
                new HttpRequestMessage(HttpMethod.Delete, $"api/auth/{userId}");
            
            requestMessage.Headers.Authorization =
                new AuthenticationHeaderValue("Bearer", accessToken.Value);
    
            var deleteUserRepsonse = 
                await _authHttpClient.SendAsync(requestMessage);
            
            Assert.NotNull(deleteUserRepsonse);
            Assert.True(deleteUserRepsonse.StatusCode == HttpStatusCode.OK);
        }

        [Fact]
        public async Task AuthLoginLogoutTest()
        {
            var user = new UserDto()
            {
                Username = "Test1234",
                Password = "Test1234"
            };
            
            var content = new StringContent(
                JsonConvert.SerializeObject(user), 
                Encoding.UTF8, 
                "application/json");
            var loginResponse = await _authHttpClient
                .PostAsync("api/auth/login", content);
            
            Assert.NotNull(loginResponse);
            Assert.True(loginResponse.StatusCode == HttpStatusCode.OK);
            
            var logoutResponse = await _authHttpClient
                .GetAsync("api/auth/logout");
            
            Assert.NotNull(logoutResponse);
            Assert.True(logoutResponse.StatusCode == HttpStatusCode.OK);
        }
    }
}