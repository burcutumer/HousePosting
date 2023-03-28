using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data.Entities;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UserController:BaseApiController
    {
        public UserController()
        {

        }

        [HttpGet]
        public async Task<ActionResult<AppUser>> GetUser()
        {
            return BadRequest();
        }
    }
}