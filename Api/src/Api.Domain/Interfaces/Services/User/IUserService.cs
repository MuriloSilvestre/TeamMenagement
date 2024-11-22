using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Dtos.User;

namespace Domain.Interfaces.Services.User
{
    public interface IUserService
    {
        Task<UserDto> Get(int id);
        Task<UserDto> GetByEmail(string email);
        Task<IEnumerable<UserDto>> GetAll();
        Task<IEnumerable<UserDto>> GetByChat(int chatId);
        Task<IEnumerable<UserDto>> GetByTeam(int teamId);
        Task<UserDtoCreateResult> Post(UserDtoCreate user);
        Task<UserDtoUpdateResult> Put(UserDtoUpdate user);
        Task<bool> Delete(int id);
    }
}
