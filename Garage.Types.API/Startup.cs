using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Garage.Types.API.Mapper;
using Garage.Types.API.Repositories;
using Garage.Types.API.Services;
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
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace Garage.Types.API
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
            services.AddTransient<TransportTypeService>();
            services.AddTransient<TransportTypeRepository>();
            services.AddTransient<TransportSubTypeRepository>();
            services.AddTransient<TransportBrandService>();
            services.AddTransient<TransportBrandRepository>();
            services.AddTransient<TransportModelRepository>();
            services.AddTransient<TransportModelService>();
            
            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });
            
            services.AddSingleton(mapperConfig.CreateMapper());
            
            var connectionString = Configuration["DbConnectionString"];
            services.AddDbContext<TypesDbContext>(
                b => b.UseNpgsql(
                    connectionString, 
                    m => m.MigrationsAssembly("Garage.Types.API")));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            EnsureDbCreated(app);

            app.UseHttpsRedirection();
            
            app.UseCors(builder => builder
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials()
                .SetIsOriginAllowed((host) => true));
            
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
        
        private static void EnsureDbCreated(IApplicationBuilder app)
        {
            using var serviceScope = app
                .ApplicationServices
                .GetService<IServiceScopeFactory>()
                .CreateScope();

            var context = serviceScope.ServiceProvider
                .GetRequiredService<TypesDbContext>();
            context.Database.Migrate();
        }
    }
}