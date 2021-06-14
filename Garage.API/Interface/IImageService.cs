using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Garage.API.Interface
{
    public interface IImageService
    {
        Task<string> Save(IFormFile file);
    }
}