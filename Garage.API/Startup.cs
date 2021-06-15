using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Garage.API.Mappers;
using Garage.API.Repositories;
using Garage.API.Services;
using Garage.API.Workers;
using Garage.Data;
using Garage.Types.Data;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace Garage.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddCors(options =>
            {
                options.AddPolicy(name: "localhost",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });

            JwtSetup.Setup(services);
            services.AddTransient<VehicleRepository>();
            services.AddTransient<VehicleService>();
            services.AddTransient<VoteService>();
            services.AddTransient<VoteRepository>();
            services.AddTransient<BestVehiclesRepository>();
            services.AddSingleton<ImageService>();
            
            services.AddHostedService<BestVehicleWorker>();

            var mapperConfig = new MapperConfiguration(mc => { mc.AddProfile(new MapperProfile.MappingProfile()); });

            services.AddSingleton(mapperConfig.CreateMapper());

            var connectionString = Configuration["DbConnectionString"];
            services.AddDbContext<VehicleDbContext>(
                b => b.UseNpgsql(
                    connectionString,
                    m => m.MigrationsAssembly("Garage.API")));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseCors(builder => builder
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials()
                .SetIsOriginAllowed((host) => true));

            app.UseRouting();

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(env.ContentRootPath, "images")),
                RequestPath = "/images"
            });

            
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}