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
    public class ProjectStatusImplementation(MyContext context)
        : BaseRepository<ProjectStatusEntity>(context), IProjectStatusRepository
    {
        private readonly DbSet<ProjectStatusEntity> _dataset = context.Set<ProjectStatusEntity>();

        public async Task<IEnumerable<ProjectStatusEntity>> GetByProject(int projectId)
        {
            return await _dataset.Include(tp => tp.Project)
                                 .Include(tp => tp.Status)
                                 .ThenInclude(s => s.Task)
                                 .Where(tp => tp.ProjectId == projectId)
                                 .ToListAsync();
        }
    }
}
