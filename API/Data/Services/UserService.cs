using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data.Dtos;
using API.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly StoreContext _context;

        public UserService(UserManager<AppUser> userManager, StoreContext context)
        {
            _context = context;
            _userManager = userManager;

        }
        public async Task<Response<UserDto>> CreateUserAsync(CreateUserDto user)
        {
            if (user != null)
            {
                var newUser = new AppUser
                {
                    UserName = user.Email,
                    Email = user.Email,
                    FullName = user.FullName
                };

                var result = await _userManager.CreateAsync(newUser, user.Password);
                if (!result.Succeeded)
                {
                    return new Response<UserDto>
                    {
                        Error = result.Errors.Select(e => e.Description).ToList()
                    };
                }
                await _userManager.AddToRoleAsync(newUser, "user");
                return new Response<UserDto>()
                {
                    Data = MaptoUserDto(newUser)
                };
            }
            return new Response<UserDto>
            {
                Error = "user can not created"
            };
        }

        public async Task<Response<UserDto>> DeleteUserAsync(int userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());

            if (user == null)
            {
                return new Response<UserDto>()
                {
                    Error = "User not found"
                };
            }
            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
            {
                return new Response<UserDto>()
                {
                    Error = "User can not delete"
                };
            }
            return new Response<UserDto>()
            {
                Data = MaptoUserDto(user)
            };

        }

        public async Task<Response<UserDto>> GetUserByIdAsync(int userId)
        {
            var user = await _context.Users
            .Include(a => a.HomeAds)
            .FirstOrDefaultAsync(p => p.Id == userId);

            if (user == null)
            {
                return new Response<UserDto>()
                {
                    Error = "User not found"
                };
            }
            return new Response<UserDto>()
                {
                    Data = MaptoUserDto(user)
                };
        }

        public async Task<Response<bool>> UpdateUserAsync(UpdateUserDto dto, int userId)
        {
            var appUser = await _userManager.FindByIdAsync(userId.ToString());

            if (appUser == null)
            {
                return new Response<bool>()
                {
                    Error = "User not found"
                };
            }
            if (dto.CurrentPassword != null && dto.Password != null)
            {
                var result = await _userManager.ChangePasswordAsync(appUser,dto.CurrentPassword,dto.Password);

                if (!result.Succeeded)
                {
                    return new Response<bool>()
                    {
                        Error = result.Errors.Select(e => e.Description).ToArray()
                    };
                }
            }
            var res = await _userManager.UpdateAsync(appUser);

            if (!res.Succeeded)
            {
                return new Response<bool>
                {
                    Error = res.Errors.Select(e => e.Description).ToArray()
                };
            }

            return new Response<bool>
            {
                Data = true
            };
        }

        private static UserDto MaptoUserDto(AppUser appUser)
        {
            return new UserDto
            {
                Id = appUser.Id,
                FullName = appUser.FullName,
                Email = appUser.Email,
                HomeAds = appUser.HomeAds.Select(a => new HomeAdDto
                {
                    Id = a.Id,
                    IsRented = a.IsRented,
                    Location = a.Location,
                    SquareMeters = a.SquareMeters,
                    NumberOfRooms = a.NumberOfRooms,
                    FloorNumber = a.FloorNumber,
                    Heating = a.Heating,
                    Balcony = a.Balcony,
                    MapCoordinates = a.MapCoordinates,
                    Price = a.Price,
                    CreatedAt = a.CreatedAt,
                    PhotoUrl = a.PhotoUrl
                }).ToList()
            };
        }
    }
}