using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;

namespace Domain.Repository
{
    public interface IProjectStatusRepository : IRepository<ProjectStatusEntity>
    {
        Task<IEnumerable<ProjectStatusEntity>> GetByProject(int projectId);
    }
}
