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
    public class StatusImplementation(MyContext context) : BaseRepository<StatusEntity>(context), IStatusRepository
    {
        private readonly DbSet<StatusEntity> _dataset = context.Set<StatusEntity>();

        public async Task<IEnumerable<StatusEntity>> GetStatussByContent(string keyword)
        {
            return await _dataset
                         .Where(r => r.Name.Contains(keyword))
                         .ToListAsync();
        }

        public async Task<IEnumerable<StatusEntity>> GetStatusByProject(int projectId)
        {
            return await _dataset.Include(t => t.ProjectStatus)
                                 .Where(t => t.ProjectStatus.All(tp => tp.ProjectId != projectId))
                                 .ToListAsync();
        }

    }
}
