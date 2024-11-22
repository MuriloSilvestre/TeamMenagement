using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Dtos.ProjectStatus;
using Domain.Entities;
using Domain.Interfaces.Services.ProjectStatus;
using Domain.Models;
using Domain.Repository;

namespace Service.Services
{
    public class ProjectStatusService(IProjectStatusRepository repository, IMapper mapper) : IProjectStatusService
    {
        public async Task<IEnumerable<ProjectStatusDto>> GetByProject(int projectId)
        {
            var projectStatuses = await repository.GetByProject(projectId);
            return mapper.Map<IEnumerable<ProjectStatusDto>>(projectStatuses);
        }


        public async Task<ProjectStatusDto> Get(int id)
        {
            var projectStatus = await repository.SelectAsync(id);
            return mapper.Map<ProjectStatusDto>(projectStatus);
        }

        public async Task<ProjectStatusDtoCreateResult> Post(ProjectStatusDtoCreate teamProjectDtoCreate)
        {
            var map = mapper.Map<ProjectStatusModel>(teamProjectDtoCreate);
            var item = mapper.Map<ProjectStatusEntity>(map);
            var insertAsync = await repository.InsertAsync(item);
            return mapper.Map<ProjectStatusDtoCreateResult>(insertAsync);
        }

        public async Task<ProjectStatusDtoUpdateResult> Put(ProjectStatusDtoUpdate teamProject)
        {
            var map = mapper.Map<ProjectStatusModel>(teamProject);
            var item = mapper.Map<ProjectStatusEntity>(map);
            var updateAsync = await repository.UpdateAsync(item);
            return mapper.Map<ProjectStatusDtoUpdateResult>(updateAsync);
        }

        public async Task<bool> Delete(int id)
        {
            return await repository.DeleteAsync(id);
        }
    }
}
