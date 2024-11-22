using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Dtos.User;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Interfaces.Services.User;
using Domain.Models;
using Domain.Repository;

namespace Service.Services
{
    public class UserService(IRepository<UserEntity> repository, IMapper mapper, IUserRepository userRepository)
        : IUserService
    {
        public async Task<IEnumerable<UserDto>> GetAll()
        {
            var users = await repository.SelectAsync();
            return mapper.Map<IEnumerable<UserDto>>(users);
        }

        public async Task<UserDto> Get(int id)
        {
            var user = await repository.SelectAsync(id);
            return mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> GetByEmail(string email)
        {
            var userByEmail = await userRepository.FindByLogin(email);
            return mapper.Map<UserDto>(userByEmail);
        }

        public async Task<IEnumerable<UserDto>> GetByChat(int chatId)
        {
            var usersByChat = await userRepository.GetUsersByChat(chatId);
            return mapper.Map<IEnumerable<UserDto>>(usersByChat);
        }

        public async Task<IEnumerable<UserDto>> GetByTeam(int teamId)
        {
            var usersByTeam = await userRepository.GetUsersByTeam(teamId);
            return mapper.Map<IEnumerable<UserDto>>(usersByTeam);
        }

        public async Task<UserDtoCreateResult> Post(UserDtoCreate user)
        {
            var map = mapper.Map<UserModel>(user);
            map.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            var item = mapper.Map<UserEntity>(map);
            var insertAsync = await repository.InsertAsync(item);
            return mapper.Map<UserDtoCreateResult>(insertAsync);
        }

        public async Task<UserDtoUpdateResult> Put(UserDtoUpdate user)
        {
            var map = mapper.Map<UserModel>(user);
            if (!string.IsNullOrEmpty(user.NewPassword))
            {
                map.Password = BCrypt.Net.BCrypt.HashPassword(user.NewPassword);
            }
            var item = mapper.Map<UserEntity>(map);
            var updateAsync = await repository.UpdateAsync(item);
            return mapper.Map<UserDtoUpdateResult>(updateAsync);
        }

        public async Task<bool> Delete(int id)
        {
            return await repository.DeleteAsync(id);
        }
    }
}