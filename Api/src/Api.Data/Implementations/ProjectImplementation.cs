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
    public class ProjectImplementation(MyContext context) : BaseRepository<ProjectEntity>(context), IProjectRepository
    {
        private readonly DbSet<ProjectEntity> _dataset = context.Set<ProjectEntity>();

        public async Task<IEnumerable<ProjectEntity>> Select()
        {
            return await _dataset.Include(t => t.Tasks)
                                 .ToListAsync();
        }

        public async Task<IEnumerable<ProjectEntity>> GetProjectsByContent(string keyword)
        {
            return await _dataset
                         .Where(p => p.Title.Contains(keyword))
                         .ToListAsync();
        }

        public async Task<IEnumerable<ProjectEntity>> GetProjectsByTeam(List<int> teamIds)
        {
            return await _dataset.Include(p => p.TeamProjects)
                                 .Where(p => p.TeamProjects.Any(tp => teamIds.Contains(tp.TeamId)))
                                 .ToListAsync();
        }

    }
}
