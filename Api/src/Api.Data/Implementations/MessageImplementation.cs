using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Context;
using Data.Repository;
using Domain.Entities;
using Domain.Repository;
using Microsoft.EntityFrameworkCore;

namespace Data.Implementations
{
    public class MessageImplementation(MyContext context) : BaseRepository<MessageEntity>(context), IMessageRepository
    {
        private readonly DbSet<MessageEntity> _dataset = context.Set<MessageEntity>();

        public async Task<IEnumerable<MessageEntity>> GetMessagesByContent(string keyword)
        {
            return await _dataset
                         .Where(m => m.Content.Contains(keyword))
                         .ToListAsync();
        }

        public async Task<IEnumerable<MessageEntity>> GetMessagesByUser(int userId)
        {
            return await _dataset
                        .Where(m => m.UserId == userId)
                        .ToListAsync();
        }

        public async Task<IEnumerable<MessageEntity>> GetMessagesByChat(int chatId)
        {
            return await _dataset.Include(m => m.User)
                                 .Where(m => m.ChatId == chatId)
                                 .ToListAsync();
        }
    }
}
