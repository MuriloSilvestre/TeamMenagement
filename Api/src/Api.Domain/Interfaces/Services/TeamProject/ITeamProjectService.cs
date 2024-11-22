using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Dtos.TeamProject;

namespace Domain.Interfaces.Services.TeamProject
{
    public interface ITeamProjectService
    {
        Task<TeamProjectDto> Get(int id);
        Task<IEnumerable<TeamProjectDto>> GetByTeam(int teamId);
        Task<IEnumerable<TeamProjectDto>> GetByProject(int projectId);
        Task<TeamProjectDtoCreateResult> Post(TeamProjectDtoCreate teamProject);
        Task<TeamProjectDtoUpdateResult> Put(TeamProjectDtoUpdate teamProject);
        Task<bool> Delete(int id);
    }
}
