using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;

namespace Domain.Repository
{
    public interface IUserChatRepository : IRepository<UserChatEntity>
    {
        Task<IEnumerable<UserChatEntity>> GetByChat(int chatId);
        Task<IEnumerable<UserChatEntity>> GetByUser(int userId);
    }
}
