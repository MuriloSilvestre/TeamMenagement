using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;

namespace Domain.Repository
{
    public interface IProjectRepository : IRepository<ProjectEntity>
    {
        Task<IEnumerable<ProjectEntity>> Select();
        Task<IEnumerable<ProjectEntity>> GetProjectsByContent(string keyword);
        Task<IEnumerable<ProjectEntity>> GetProjectsByTeam(List<int> teamIds);
    }
}
