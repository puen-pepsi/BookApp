using System;
using API.Data;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using API.Services;
using API.SignalR;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddSingleton<PresenceTracker>();
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
            services.Configure<PhotoSettings>(config.GetSection("PhotoSettings"));
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddTransient<IPhotoStoryService, PhotoStorySevice>();
            services.AddTransient<IPhotoStorage, FileSystemPhotoStorage>();

            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.AddScoped<LogUserActivity>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddDbContext<DataContext>(options =>
            {
                //options.UseNpgsql(config.GetConnectionString("DefaultConnection"));
                var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

                string connStr;

                // Depending on if in development or production, use either Heroku-provided
                // connection string, or development connection string from env var.
                if (env == "Development")
                {
                    // Use connection string from file.
                    connStr = config.GetConnectionString("DefaultConnection");
                }
                else
                {
                    // Use connection string provided at runtime by Heroku.
                    var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

                    // Parse connection URL to connection string for Npgsql
                    connUrl = connUrl.Replace("postgres://", string.Empty);
                    var pgUserPass = connUrl.Split("@")[0];
                    var pgHostPortDb = connUrl.Split("@")[1];
                    var pgHostPort = pgHostPortDb.Split("/")[0];
                    //var pgDb = pgHostPortDb.Split("/")[1];
                    // var pgUser = pgUserPass.Split(":")[0];
                    // var pgPass = pgUserPass.Split(":")[1];
                    // var pgHost = pgHostPort.Split(":")[0];
                    // var pgPort = pgHostPort.Split(":")[1];
                    var pgUser = "ldqjukpmtasnbc";
                    var pgPass = "26a4e72e103f337e39deaedfb9bce79fbad7cd8b2ba84f084c528d3c28f40f39";
                    var pgHost = "ec2-3-231-69-204.compute-1.amazonaws.com";
                    var pgPort = "5432";
                    var pgDb ="dftrok1obpgbr7";
                    
                    connStr = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb}";
                }

                // Whether the connection string came from the local development configuration file
                // or from the environment variable from Heroku, use it to set up your DbContext.
                options.UseNpgsql(connStr);
            });

            return services;
        }
    }
}