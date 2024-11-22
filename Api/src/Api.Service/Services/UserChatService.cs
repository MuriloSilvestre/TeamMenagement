using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Dtos.UserChat;
using Domain.Entities;
using Domain.Interfaces.Services.UserChat;
using Domain.Models;
using Domain.Repository;

namespace Service.Services
{
    public class UserChatService(IUserChatRepository repository, IMapper mapper) : IUserChatService
    {
        public async Task<IEnumerable<UserChatDto>> GetByChat(int chatId)
        {
            var usersChats = await repository.GetByChat(chatId);
            return mapper.Map<IEnumerable<UserChatDto>>(usersChats);
        }

        public async Task<IEnumerable<UserChatDto>> GetByUser(int userId)
        {
            var usersChats = await repository.GetByUser(userId);
            return mapper.Map<IEnumerable<UserChatDto>>(usersChats);
        }

        public async Task<UserChatDto> Get(int id)
        {
            var userChat = await repository.SelectAsync(id);
            return mapper.Map<UserChatDto>(userChat);
        }

        public async Task<UserChatDtoCreateResult> Post(UserChatDtoCreate userChatDtoCreate)
        {
            var map = mapper.Map<UserChatModel>(userChatDtoCreate);
            var item = mapper.Map<UserChatEntity>(map);
            var insertAsync = await repository.InsertAsync(item);
            return mapper.Map<UserChatDtoCreateResult>(insertAsync);
        }

        public async Task<UserChatDtoUpdateResult> Put(UserChatDtoUpdate userChat)
        {
            var map = mapper.Map<UserChatModel>(userChat);
            var item = mapper.Map<UserChatEntity>(map);
            var updateAsync = await repository.UpdateAsync(item);
            return mapper.Map<UserChatDtoUpdateResult>(updateAsync);
        }

        public async Task<bool> Delete(int id)
        {
            return await repository.DeleteAsync(id);
        }
    }
}
