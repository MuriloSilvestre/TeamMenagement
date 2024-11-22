using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Dtos.Chat;
using Domain.Entities;
using Domain.Interfaces.Services.Chat;
using Domain.Models;
using Domain.Repository;

namespace Service.Services
{
    public class ChatService(
        IChatRepository repository,
        IMapper mapper)
        : IChatService
    {
        public async Task<IEnumerable<ChatDto>> GetAll()
        {
            var chats = await repository.SelectAsync();
            return mapper.Map<IEnumerable<ChatDto>>(chats);
        }

        public async Task<IEnumerable<ChatDto>> GetChatsByUser(int userId)
        {
            var chats = await repository.GetChatsByUser(userId);
            return mapper.Map<IEnumerable<ChatDto>>(chats);
        }

        public async Task<ChatDto> Get(int id)
        {
            var chat = await repository.SelectAsync(id);
            return mapper.Map<ChatDto>(chat);
        }

        public async Task<ChatDto> GetByName(string titulo)
        {
            var chatsByName = await repository.GetChatsByName(titulo);
            return mapper.Map<ChatDto>(chatsByName);
        }

        public async Task<ChatDtoCreateResult> Post(ChatDtoCreate chatDtoCreate)
        {
            var map = mapper.Map<ChatModel>(chatDtoCreate);
            var item = mapper.Map<ChatEntity>(map);
            var insertAsync = await repository.InsertAsync(item);
            return mapper.Map<ChatDtoCreateResult>(insertAsync);
        }

        public async Task<ChatDtoUpdateResult> Put(ChatDtoUpdate chat)
        {
            var map = mapper.Map<ChatModel>(chat);
            var item = mapper.Map<ChatEntity>(map);
            var updateAsync = await repository.UpdateAsync(item);
            return mapper.Map<ChatDtoUpdateResult>(updateAsync);
        }

        public async Task<bool> Delete(int id)
        {
            return await repository.DeleteAsync(id);
        }
    }
}
