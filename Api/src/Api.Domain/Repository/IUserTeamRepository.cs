using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;

namespace Domain.Repository
{
    public interface IUserTeamRepository : IRepository<UserTeamEntity>
    {
        Task<IEnumerable<UserTeamEntity>> GetByTeam(int teamId);
        Task<IEnumerable<UserTeamEntity>> GetByUser(int userId);
    }
}
