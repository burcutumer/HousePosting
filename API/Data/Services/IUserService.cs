using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data.Dtos;

namespace API.Data.Services
{
    public interface IUserService
    {
        Task<Response<UserDto>> CreateUserAsync(CreateUserDto user);
        Task<Response<UserDto>> DeleteUserAsync(int userId);
        Task<Response<UserDto>> GetUserByIdAsync(int userId);
        Task<Response<bool>> UpdateUserAsync(UpdateUserDto dto, int userId);
    }
}