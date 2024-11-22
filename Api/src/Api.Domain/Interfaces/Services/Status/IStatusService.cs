using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Dtos.Status;

namespace Domain.Interfaces.Services.Status
{
    public interface IStatusService
    {
        Task<StatusDto> Get(int id);
        Task<IEnumerable<StatusDto>> GetByContent(string content);
        Task<IEnumerable<StatusDto>> GetByProject(int projectId);
        Task<IEnumerable<StatusDto>> GetAll();
        Task<StatusDtoCreateResult> Post(StatusDtoCreate role);
        Task<StatusDtoUpdateResult> Put(StatusDtoUpdate role);
        Task<bool> Delete(int id);
    }
}
