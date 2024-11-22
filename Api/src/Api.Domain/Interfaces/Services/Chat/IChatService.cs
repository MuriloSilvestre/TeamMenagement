using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Dtos.Chat;

namespace Domain.Interfaces.Services.Chat
{
    public interface IChatService
    {
        Task<ChatDto> Get(int id);
        Task<ChatDto> GetByName(string name);
        Task<IEnumerable<ChatDto>> GetAll();
        Task<IEnumerable<ChatDto>> GetChatsByUser(int userId);
        Task<ChatDtoCreateResult> Post(ChatDtoCreate chat);
        Task<ChatDtoUpdateResult> Put(ChatDtoUpdate chat);
        Task<bool> Delete(int id);
    }
}
