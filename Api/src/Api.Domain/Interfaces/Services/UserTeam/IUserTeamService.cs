using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Dtos.UserTeam;

namespace Domain.Interfaces.Services.UserTeam
{
    public interface IUserTeamService
    {
        Task<UserTeamDto> Get(int id);
        Task<IEnumerable<UserTeamDto>> GetByTeam(int teamId);
        Task<IEnumerable<UserTeamDto>> GetByUser(int userId);
        Task<UserTeamDtoCreateResult> Post(UserTeamDtoCreate userTeam);
        Task<UserTeamDtoUpdateResult> Put(UserTeamDtoUpdate userTeam);
        Task<bool> Delete(int id);
    }
}
