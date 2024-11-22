using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;

namespace Domain.Repository
{
    public interface ITeamProjectRepository : IRepository<TeamProjectEntity>
    {
        Task<IEnumerable<TeamProjectEntity>> GetByTeam(int teamId);
        Task<IEnumerable<TeamProjectEntity>> GetByProject(int projectId);
    }
}
