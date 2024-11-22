using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;

namespace Domain.Repository
{
    public interface IMessageRepository : IRepository<MessageEntity>
    {
        Task<IEnumerable<MessageEntity>> GetMessagesByContent(string keyword);
        Task<IEnumerable<MessageEntity>> GetMessagesByUser(int userId);
        Task<IEnumerable<MessageEntity>> GetMessagesByChat(int chatId);
    }
}
