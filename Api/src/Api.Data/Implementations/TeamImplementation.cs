using System;
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
    public class TeamImplementation(MyContext context) : BaseRepository<TeamEntity>(context), ITeamRepository
    {
        private readonly DbSet<TeamEntity> _dataset = context.Set<TeamEntity>();

        public async Task<IEnumerable<TeamEntity>> Select()
        {
            return await _dataset.Include(t=> t.TeamProjects)
                                 .Include(t => t.UserTeams)
                                 .ToListAsync();
        }

        public async Task<IEnumerable<TeamEntity>> GetTeamsByContent(string keyword)
        {
            return await _dataset
                         .Where(t => t.Name.Contains(keyword))
                         .ToListAsync();
        }

        public async Task<IEnumerable<TeamEntity>> GetTeamsByProject(int projectId)
        {
            return await _dataset.Include(t => t.TeamProjects)
                                 .Where(t => t.TeamProjects.All(tp => tp.ProjectId != projectId))
                                 .ToListAsync();
        }

        public async Task<IEnumerable<TeamEntity>> GetTeamsByUser(int userId)
        {
            return await _dataset.Include(t => t.UserTeams)
                                 .Where(t => t.UserTeams.Any(ut => ut.UserId == userId))
                                 .ToListAsync();
        }

    }
}
