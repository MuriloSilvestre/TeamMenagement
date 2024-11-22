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
    public class TeamProjectImplementation(MyContext context)
        : BaseRepository<TeamProjectEntity>(context), ITeamProjectRepository
    {
        private readonly DbSet<TeamProjectEntity> _dataset = context.Set<TeamProjectEntity>();

        public async Task<IEnumerable<TeamProjectEntity>> GetByTeam(int teamId)
        {
            return await _dataset.Include(tp => tp.Team)
                                 .Include(tp => tp.Project)
                                 .Where(tp => tp.TeamId == teamId)
                                 .ToListAsync();
        }

        public async Task<IEnumerable<TeamProjectEntity>> GetByProject(int projectId)
        {
            return await _dataset.Include(tp => tp.Project)
                                 .Include(tp => tp.Team)
                                 .Where(tp => tp.ProjectId == projectId)
                                 .ToListAsync();
        }
    }
}
