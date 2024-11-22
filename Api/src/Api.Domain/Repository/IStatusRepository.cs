using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;

namespace Domain.Repository
{
    public interface IStatusRepository : IRepository<StatusEntity>
    {
        Task<IEnumerable<StatusEntity>> GetStatussByContent(string keyword);
        Task<IEnumerable<StatusEntity>> GetStatusByProject(int projectId);
    }
}
