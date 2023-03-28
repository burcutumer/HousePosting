using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data.Services;
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
        public async Task<IActionResult> GetAds()
        {
            return BadRequest();
        }
    }
}