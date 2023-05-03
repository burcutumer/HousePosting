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
    public class AdsService : IAdsService
    {
        private readonly StoreContext _context;
        private readonly UserManager<AppUser> _userManager;
        public AdsService(StoreContext context, UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _context = context;
        }

        public async Task<Response<HomeAdDto>> CreateHomeAd(CreateHomeAdDto dto, string userEmail)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == userEmail);

            if (user == null)
            {
                return new Response<HomeAdDto>
                {
                    Error = "user not found"
                };
            }

            var homeAd = new HomeAd
            {
                IsRented = dto.IsRented,
                Location = dto.Location,
                SquareMeters = dto.SquareMeters,
                NumberOfRooms = dto.NumberOfRooms,
                FloorNumber = dto.FloorNumber,
                Heating = dto.Heating,
                Balcony = dto.Balcony,
                MapCoordinates = dto.MapCoordinates,
                Price = dto.Price,
                CreatedAt = dto.CreatedAt,
                PhotoUrl = dto.PhotoUrl,
                AppUser = user
            };
            await _context.HomeAds.AddAsync(homeAd);
            var result = await _context.SaveChangesAsync() > 0;

            if (!result)
            {
                return new Response<HomeAdDto>
                {
                    Error = "House Posting is not created"
                };
            }
            return new Response<HomeAdDto>
            {
                Data = MapToHomeAdDto(homeAd)
            };
        }

        public async Task<Response<HomeAdDto>> GetHomeAdById(int id)
        {
            var ad = await _context.HomeAds
                .Include(a => a.AppUser)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (ad == null)
            {
                return new Response<HomeAdDto>
                {
                    Error = "House Ads were not found"
                };
            }
            return new Response<HomeAdDto>
            {
                Data = MapToHomeAdDto(ad)
            };
        }

        public async Task<Response<List<HomeAdDto>>> GetHomeAdsByEmail(string userEmail)
        {
            var ads = await _context.HomeAds
                .Include(a => a.AppUser)
                .Where(h => h.AppUser.Email == userEmail)
                .Select(m => MapToHomeAdDto(m))
                .ToListAsync();

            if (ads == null)
            {
                return new Response<List<HomeAdDto>>
                {
                    Error = "House Ads were not found"
                };
            }
            return new Response<List<HomeAdDto>>
            {
                Data = ads
            };
        }

        public async Task<Response<List<HomeAdDto>>> GetHomeAds()
        {
            var ads = await _context.HomeAds
                .Include(a => a.AppUser)
                .Select(a => MapToHomeAdDto(a))
                .ToListAsync();

            if (ads == null)
            {
                return new Response<List<HomeAdDto>>
                {
                    Error = "House Ads were not found"
                };
            }
            return new Response<List<HomeAdDto>>
            {
                Data = ads
            };
        }


        private static HomeAdDto MapToHomeAdDto(HomeAd ad)
        {
            return new HomeAdDto
            {
                Id = ad.Id,
                IsRented = ad.IsRented,
                Location = ad.Location,
                SquareMeters = ad.SquareMeters,
                NumberOfRooms = ad.NumberOfRooms,
                FloorNumber = ad.FloorNumber,
                Heating = ad.Heating,
                Balcony = ad.Balcony,
                MapCoordinates = ad.MapCoordinates,
                Price = ad.Price,
                CreatedAt = ad.CreatedAt,
                PhotoUrl = ad.PhotoUrl,
                HomeAdUserDto = new HomeAdUserDto
                {
                    Id = ad.AppUserId,
                    Email = ad.AppUser.Email,
                    FullName = ad.AppUser.FullName
                }
            };
        }
    }
}