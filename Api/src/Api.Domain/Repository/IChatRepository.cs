using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;

namespace Domain.Repository
{
    public interface IChatRepository : IRepository<ChatEntity>
    {
        Task<ChatEntity> GetChatsByName(string title);
        Task<IEnumerable<ChatEntity>> GetChatsByUser(int userId);
    }
}
