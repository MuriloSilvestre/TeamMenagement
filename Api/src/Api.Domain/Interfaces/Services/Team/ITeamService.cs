using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Dtos.Team;

namespace Domain.Interfaces.Services.Team
{
    public interface ITeamService
    {
        Task<TeamDto> Get(int id);
        Task<IEnumerable<TeamDto>> GetByContent(string content);
        Task<IEnumerable<TeamDto>> GetByProject(int projectId);
        Task<IEnumerable<TeamDto>> GetByUser(int userId);
        Task<IEnumerable<TeamDto>> GetAll();
        Task<TeamDtoCreateResult> Post(TeamDtoCreate team);
        Task<TeamDtoUpdateResult> Put(TeamDtoUpdate team);
        Task<bool> Delete(int id);
        List<int> GetTeamIdList(string teamIds);
    }
}
