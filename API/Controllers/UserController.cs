using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data.Dtos;
using API.Data.Entities;
using API.Data.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class UserController : BaseApiController
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Response<UserDto>>> GetUser(int id)
        {
            var result = await _userService.GetUserByIdAsync(id);
            if (result.Data != null)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<Response<UserDto>>> CreateUser([FromBody] CreateUserDto user)
        {
            var result = await _userService.CreateUserAsync(user);

            if (result.Data != null)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Response<bool>>> UpdateUser([FromBody] UpdateUserDto dto, int id)
        {
            var result = await _userService.UpdateUserAsync(dto, id);

            if (result.Error != null)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Response<UserDto>>> DeleteUser(int id)
        {
            var result = await _userService.DeleteUserAsync(id);

            if (result.Error != null)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
    }
}