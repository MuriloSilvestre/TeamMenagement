using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Dtos.Task;

namespace Domain.Interfaces.Services.Task
{
    public interface ITaskService
    {
        Task<TaskDto> Get(int id);
        Task<IEnumerable<TaskDto>> GetAll(int projectId, int userId);
        Task<TaskDtoCreateResult> Post(TaskDtoCreate task);
        Task<TaskDtoUpdateResult> Put(TaskDtoUpdate task);
        Task<TaskDtoUpdateResult> PutStatus(TaskStatusDtoUpdate task);
        Task<bool> Delete(int id);
    }
}
