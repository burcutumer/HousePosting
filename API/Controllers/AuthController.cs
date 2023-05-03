using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data.Dtos;
using API.Data.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AuthController: BaseApiController
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        public async Task<ActionResult<Response<LoginResponseDto>>> CheckUserCredentials([FromBody] LoginRequestDto loginRequestDto)
        {
            var result = await _authService.CheckUserCredentials(loginRequestDto);

            if (result.Data == null)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}