using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager, 
            RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            //var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            //var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            //if (users == null) return;

            var roles = new List<AppRole>
            {
                new AppRole{Name = "Member"},
                new AppRole{Name = "Admin"},
                new AppRole{Name = "Moderator"},
                new AppRole{Name = "VIP"}
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }
            
            // foreach (var user in users)
            // {
            //     user.UserName = user.UserName.ToLower();
            //     await userManager.CreateAsync(user, "Pa$$w0rd");
            //     await userManager.AddToRoleAsync(user, "Member");
            // }

            var admin = new AppUser
            {
                UserName = "admin",
                KnownAs = "admin",
                Email="admin@rainobu.com",
                EmailConfirmed=true
            };

            await userManager.CreateAsync(admin, "Pa$$w0rd");
            await userManager.AddToRolesAsync(admin, new[] {"Admin", "Moderator"});
        }

        // public static async Task SeedAsync(DataContext context, ILoggerFactory loggerFactory)
        // {
        //     try
        //     {

        //         if (!context.Genres.Any())
        //         {
        //             var genredata = await System.IO.File.ReadAllTextAsync("Data/SeedGenre.json");
        //             var genres = JsonSerializer.Deserialize<List<Genre>>(genredata);

        //             foreach (var item in genres)
        //             {
        //                 context.Genres.Add(item);
        //             }

        //             await context.SaveChangesAsync();
        //         }

        //         if (!context.titleName.Any())
        //         {
        //             var titledata = await System.IO.File.ReadAllTextAsync("Data/SeedTitle.json");
        //             var titles = JsonSerializer.Deserialize<List<TitleName>>(titledata);

        //             foreach (var item in titles)
        //             {
        //                 context.titleName.Add(item);
        //             }

        //             await context.SaveChangesAsync();
        //         }

        //     }
        //     catch (Exception ex)
        //     {
        //         var logger = loggerFactory.CreateLogger<DataContext>();
        //         logger.LogError(ex.Message);
        //     }
        // }
        
    }
}
