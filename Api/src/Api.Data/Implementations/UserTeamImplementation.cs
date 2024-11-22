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
    public class UserTeamImplementation(MyContext context)
        : BaseRepository<UserTeamEntity>(context), IUserTeamRepository
    {
        private readonly DbSet<UserTeamEntity> _dataset = context.Set<UserTeamEntity>();

        public async Task<IEnumerable<UserTeamEntity>> GetByTeam(int teamId)
        {
            return await _dataset.Include(tp => tp.Team)
                                 .Include(tp => tp.User)
                                 .Where(tp => tp.TeamId == teamId)
                                 .ToListAsync();
        }

        public async Task<IEnumerable<UserTeamEntity>> GetByUser(int userId)
        {
            return await _dataset.Include(tp => tp.User)
                                 .Where(tp => tp.UserId == userId)
                                 .ToListAsync();
        }
    }
}
