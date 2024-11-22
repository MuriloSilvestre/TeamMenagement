using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Dtos.Project;

namespace Domain.Interfaces.Services.Project
{
    public interface IProjectService
    {
        Task<ProjectDto> Get(int id);
        Task<IEnumerable<ProjectDto>> GetByContent(string content);
        Task<IEnumerable<ProjectDto>> GetAll();
        Task<IEnumerable<ProjectDto>> GetProjectsByTeam(List<int> teamIds);
        Task<ProjectDtoCreateResult> Post(ProjectDtoCreate project);
        Task<ProjectDtoUpdateResult> Put(ProjectDtoUpdate project);
        Task<bool> Delete(int id);
    }
}
