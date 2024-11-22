using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Dtos.ProjectStatus;

namespace Domain.Interfaces.Services.ProjectStatus
{
    public interface IProjectStatusService
    {
        Task<ProjectStatusDto> Get(int id);
        Task<IEnumerable<ProjectStatusDto>> GetByProject(int projectId);
        Task<ProjectStatusDtoCreateResult> Post(ProjectStatusDtoCreate teamProject);
        Task<ProjectStatusDtoUpdateResult> Put(ProjectStatusDtoUpdate teamProject);
        Task<bool> Delete(int id);
    }
}
