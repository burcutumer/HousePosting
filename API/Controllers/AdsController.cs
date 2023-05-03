using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data.Dtos;
using API.Data.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AdsController: BaseApiController
    {
        private readonly IAdsService _adsService;
        public AdsController(IAdsService adsService)
        {
            _adsService = adsService;
        }


        [HttpGet]
        public async Task<ActionResult<Response<List<HomeAdDto>>>> GetHomeAds()
        {
            var result = await _adsService.GetHomeAds();

            if (result.Error != null)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Response<HomeAdDto>>> GetHomeAdById(int id)
        {
            var result = await _adsService.GetHomeAdById(id);

            if (result.Error != null)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [Authorize(Roles = "user")]
        [HttpGet("user")]
        public async Task<ActionResult<Response<List<HomeAdDto>>>> GetUserHomeAds()
        {
            var userEmail = User.Identity?.Name;

            var result = await _adsService.GetHomeAdsByEmail(userEmail!);

            if (result.Error != null)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }


        [Authorize(Roles = "user")]
        [HttpPost]
        public async Task<ActionResult<Response<HomeAdDto>>> CreateHomeAd(CreateHomeAdDto dto)
        {
            var userEmail = User.Identity?.Name;

            var result = await _adsService.CreateHomeAd(dto, userEmail!);

            if (result.Error != null)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
    }
}