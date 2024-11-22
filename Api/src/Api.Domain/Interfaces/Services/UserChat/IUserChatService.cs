using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Dtos.UserChat;

namespace Domain.Interfaces.Services.UserChat
{
    public interface IUserChatService
    {
        Task<UserChatDto> Get(int id);
        Task<IEnumerable<UserChatDto>> GetByChat(int chatId);
        Task<IEnumerable<UserChatDto>> GetByUser(int userId);
        Task<UserChatDtoCreateResult> Post(UserChatDtoCreate userChat);
        Task<UserChatDtoUpdateResult> Put(UserChatDtoUpdate userChat);
        Task<bool> Delete(int id);
    }
}
