using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;

namespace Domain.Repository
{
    public interface ITaskRepository : IRepository<TaskEntity>
    {
        Task<TaskEntity> GetTasksByTitle(string title);
        Task<IEnumerable<TaskEntity>> GetTasksByUser(int userId);
        Task<IEnumerable<TaskEntity>> GetTasksByProject(int projectId, int assignedToUserId);
    }
}
