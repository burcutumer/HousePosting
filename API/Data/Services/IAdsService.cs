using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data.Dtos;

namespace API.Data.Services
{
    public interface IAdsService
    {
        Task<Response<HomeAdDto>> CreateHomeAd(CreateHomeAdDto dto, string userEmail);
        Task<Response<HomeAdDto>> GetHomeAdById(int adId);
        Task<Response<List<HomeAdDto>>> GetHomeAdsByEmail(string userEmail);
        Task<Response<List<HomeAdDto>>> GetHomeAds();
    }
}