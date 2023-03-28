using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public class DbInitializer
    {
        public static async Task Initialize(StoreContext context, RoleManager<AppRole> roleManager, UserManager<AppUser> userManager)
        {
            if (userManager.Users.Any()) return;

            await roleManager.CreateAsync(new AppRole
            {
                Name = "user"
            });

            var adminUser = new AppUser
            {
                FullName = "admin@mail.com",
                Email = "admin@mail.com",
                UserName = "admin@mail.com"
            };
            await userManager.CreateAsync(adminUser, "Pa$$w0rd!");
            await userManager.AddToRoleAsync(adminUser, "admin");
        }
    }
}