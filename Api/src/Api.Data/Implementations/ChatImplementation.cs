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
    public class ChatImplementation(MyContext context) : BaseRepository<ChatEntity>(context), IChatRepository
    {
        private readonly DbSet<ChatEntity> _dataset = context.Set<ChatEntity>();

        public async Task<ChatEntity> GetChatsByName(string name)
        {
            return await _dataset.Include(c => c.Name)
                                .SingleOrDefaultAsync(c => c.Name.Equals(name));
        }

        public async Task<IEnumerable<ChatEntity>> GetChatsByUser(int userId)
        {
            return await _dataset.Include(c => c.UserChats)
                                 .Where(c => c.UserChats.Any(uc => uc.UserId == userId))
                                 .ToListAsync();
        }

    }
}
