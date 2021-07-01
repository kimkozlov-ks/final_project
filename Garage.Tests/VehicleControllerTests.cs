using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Garage.API;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.TestHost;
using Xunit;

namespace Garage.Tests
{
    public class VehicleControllerTests
    {
        private readonly HttpClient _client;

        public VehicleControllerTests()
        {
            var hostBuilder = new WebHostBuilder()
                .UseStartup<Startup>();
            var server = new TestServer(hostBuilder);
            _client = server.CreateClient();
        }

        [Fact]
        public async Task VehicleCrudTest()
        {
            var content = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("Nickname", "test_nickname"),
                new KeyValuePair<string, string>("Description", "Test_Description"),
                new KeyValuePair<string, string>("TransportTypeId", "3"),
                new KeyValuePair<string, string>("TransportSubTypeId", "3"),
                new KeyValuePair<string, string>("TransportBrandId", "3"),
                new KeyValuePair<string, string>("TransportModelId", "3"),
                new KeyValuePair<string, string>("Image", 
                    new FormFile(
                        new MemoryStream(Encoding.UTF8.GetBytes("dummy image")), 0, 0, "Data", "image.png").ToString())
            });

            var actionResult = await _client.PostAsync("/add", content);
            
            Assert.NotNull(actionResult);
            Assert.True(actionResult.StatusCode == HttpStatusCode.OK);
        }
    }

    public interface IFromFile
    {
    }
}