using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Dtos.Message;

namespace Domain.Interfaces.Services.Message
{
    public interface IMessageService
    {
        Task<MessageDto> Get(int id);
        Task<IEnumerable<MessageDto>> GetByContent(string content);
        Task<IEnumerable<MessageDto>> GetAll();
        Task<IEnumerable<MessageDto>> GetMessagesByUser(int userId);
        Task<IEnumerable<MessageDto>> GetMessagesByChat(int chatId);
        Task<MessageDtoCreateResult> Post(MessageDtoCreate message);
        Task<MessageDtoUpdateResult> Put(MessageDtoUpdate message);
        Task<bool> Delete(int id);
    }
}
