using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Data.Dtos;
using API.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Data.Services
{
    public class AuthService : IAuthService
    {
        private readonly string _secretKey;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        public AuthService(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IConfiguration config)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _secretKey = config["Jwt:Secret"];
        }

        private static string GenerateJwtToken(string secretKey, int expireMinutes, List<Claim> claims)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(expireMinutes),
                signingCredentials: creds
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<Response<LoginResponseDto>> CheckUserCredentials(LoginRequestDto loginRequestDto)
        {
            var user = await _userManager.FindByEmailAsync(loginRequestDto.Email);

            if (user == null)
            {
                return new Response<LoginResponseDto>
                {
                    Error = "User is not found"
                };
            }
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginRequestDto.Password, false);

            if (!result.Succeeded)
            {
                return new Response<LoginResponseDto>
                {
                    Error = "User is not found"
                };
            }
            var roles = await _userManager.GetRolesAsync(user);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name,loginRequestDto.Email) // name value pair
            };
            claims.AddRange(roles.Select(r => new Claim(ClaimTypes.Role,r)));

            var token = GenerateJwtToken(_secretKey, 10, claims);

            return new Response<LoginResponseDto>
            {
                Data = new LoginResponseDto
                {
                    JwtToken = token
                }
            };
        }
    }
}