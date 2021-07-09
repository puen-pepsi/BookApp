using System;
using System.IO;
using API.Data;
using API.Extensions;
using API.Middleware;
using API.SignalR;
using EmailService;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;
        private readonly IWebHostEnvironment _env;
        public Startup(IConfiguration config, IWebHostEnvironment env)
        {
            _env = env;
            _config = config;
        }

        //public IConfiguration Configuration { get; }
        public void ConfigureDevelopmentServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(x => {
                x.UseSqlite(_config.GetConnectionString
                ("DefaultConnection"));
            });
            ConfigureServices(services);
        }
        public void ConfigureProductionServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(x => {
                x.UseSqlServer(_config.GetConnectionString
                ("DefaultConnection"));
            });
            ConfigureServices(services);
        }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddApplicationServices(_config);
            services.AddControllers();
            services.AddControllersWithViews()
                .AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );
            services.AddCors();
            services.AddIdentityServices(_config);
            services.AddSignalR();
            
            

            services.Configure<FormOptions>(o => 
            { 
                o.ValueLengthLimit = int.MaxValue; 
                o.MultipartBodyLengthLimit = int.MaxValue; 
                o.MemoryBufferThreshold = int.MaxValue; 
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
            }else{
                app.UseHsts(); 
            }
           
            app.UseDeveloperExceptionPage();
            app.UseMiddleware<ExceptionMiddleware>();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(x => x.AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials()
                .WithOrigins("https://localhost:4200"));


            app.UseAuthentication();
            app.UseAuthorization();

            app.UseDefaultFiles();
            app.UseStaticFiles();
             app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), "Resources")
                ), RequestPath = "/resources"
            });               
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<PresenceHub>("hubs/presence");
                endpoints.MapHub<MessageHub>("hubs/message");
                endpoints.MapHub<CommentHub>("hubs/comment");
                endpoints.MapFallbackToController("Index","Fallback");
            });
        }
    }
}
