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
    public class TaskImplementation(MyContext context) : BaseRepository<TaskEntity>(context), ITaskRepository
    {
        private readonly DbSet<TaskEntity> _dataset = context.Set<TaskEntity>();

        public async Task<TaskEntity> GetTasksByTitle(string title)
        {
            return await _dataset.Include(t => t.Title)
                                 .SingleOrDefaultAsync(t => t.Title.Equals(title));
        }

        public async Task<IEnumerable<TaskEntity>> GetTasksByUser(int assignedToUserId)
        {
            return await _dataset
                         .Where(t => t.AssignedToUserId == assignedToUserId)
                         .ToListAsync();
        }

        public async Task<IEnumerable<TaskEntity>> GetTasksByProject(int projectId, int assignedToUserId)
        {
            return await _dataset
                         .Where(t => t.ProjectId == projectId && t.AssignedToUserId == assignedToUserId)
                         .ToListAsync();
        }
    }
}
