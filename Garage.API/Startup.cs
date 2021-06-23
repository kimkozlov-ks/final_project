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
using Quartz;

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
            
            services.AddQuartz(q =>
            {    
                q.UseMicrosoftDependencyInjectionScopedJobFactory();
                var jobKey = new JobKey("BestVehiclesJob");
                q.AddJob<BestVehicleWorker>(opts => opts.WithIdentity(jobKey));

                q.AddTrigger(opts => opts
                    .ForJob(jobKey)
                    .WithIdentity("BestVehiclesJob-trigger") 
                    .WithCronSchedule("0 0/1 * * * ?")); // fired every 5 minutes

                // q.AddTrigger(opts => opts
                //     .ForJob(jobKey)
                //     .WithIdentity("BestVehiclesJob-trigger")
                //     .WithSchedule(CronScheduleBuilder.DailyAtHourAndMinute(0, 0))); // fired every day at 00 00
            });

            services.AddQuartzServer(options =>
            {
                options.WaitForJobsToComplete = true;
            });

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