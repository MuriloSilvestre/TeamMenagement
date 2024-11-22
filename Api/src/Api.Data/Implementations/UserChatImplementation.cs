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
    public class UserChatImplementation(MyContext context)
        : BaseRepository<UserChatEntity>(context), IUserChatRepository
    {
        private readonly DbSet<UserChatEntity> _dataset = context.Set<UserChatEntity>();

        public async Task<IEnumerable<UserChatEntity>> GetByChat(int chatId)
        {
            return await _dataset.Include(tp => tp.User)
                                 .Include(tp => tp.Chat)
                                 .Where(tp => tp.ChatId == chatId)
                                 .ToListAsync();
        }

        public async Task<IEnumerable<UserChatEntity>> GetByUser(int userId)
        {
            return await _dataset.Include(tp => tp.User)
                                 .Where(tp => tp.UserId == userId)
                                 .ToListAsync();
        }
    }
}
