using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;

namespace Domain.Repository
{
    public interface ITeamRepository : IRepository<TeamEntity>
    {
        Task<IEnumerable<TeamEntity>> Select();
        Task<IEnumerable<TeamEntity>> GetTeamsByContent(string keyword);
        Task<IEnumerable<TeamEntity>> GetTeamsByProject(int projectId);
        Task<IEnumerable<TeamEntity>> GetTeamsByUser(int userId);
    }
}
