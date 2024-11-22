using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Dtos.User;
using Domain.Entities;
using Domain.Interfaces;

namespace Domain.Repository
{
    public interface IUserRepository : IRepository<UserEntity>
    {
        Task<DashboardDto> GetDashboard(int id);

        Task<UserEntity> FindByLogin(string email);

        Task<IEnumerable<UserEntity>> GetUsersByChat(int chatId);

        Task<IEnumerable<UserEntity>> GetUsersByTeam(int teamId);
    }
}
