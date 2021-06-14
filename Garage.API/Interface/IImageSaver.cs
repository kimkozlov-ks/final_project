using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Garage.API.Interface
{
    public interface IImageSaver
    {
        Task<string> Save(IFormFile file);
    }
}