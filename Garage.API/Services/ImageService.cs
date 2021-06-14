using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;
using Garage.API.Interface;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace Garage.API.Services
{
    public class ImageService : IImageService
    {
        private readonly IWebHostEnvironment _environment;

        private List<string> _validImageExtensions = new List<string>()
        {
            ".jpg", 
            ".png", 
            ".jpeg"
        };
        
        public ImageService(IWebHostEnvironment environment)
        {
            _environment = environment;
        }
        
        public async Task<string> Save(IFormFile file)
        {    
            var extension = Path.GetExtension(file.FileName);
            
            if(extension != null && _validImageExtensions.Contains(extension.ToLower()))
            {
                var imageName = Guid.NewGuid().ToString() + extension;
                
                string filePath = Path.Combine(_environment.WebRootPath, imageName);
                await using (Stream fileStream = new FileStream(filePath, FileMode.Create)) {
                    await file.CopyToAsync(fileStream);
                }

                return imageName;
            }

            throw new FileLoadException();
        }
    }
}