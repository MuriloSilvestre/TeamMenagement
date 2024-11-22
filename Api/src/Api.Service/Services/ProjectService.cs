using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Dtos.Project;
using Domain.Entities;
using Domain.Interfaces.Services.Project;
using Domain.Models;
using Domain.Repository;

namespace Service.Services
{
    public class ProjectService(IProjectRepository repository, IMapper mapper) : IProjectService
    {
        public async Task<IEnumerable<ProjectDto>> GetAll()
        {
            var projects = await repository.Select();
            return mapper.Map<IEnumerable<ProjectDto>>(projects);
        }

        public async Task<IEnumerable<ProjectDto>> GetProjectsByTeam(List<int> teamIds)
        {
            var projects = await repository.GetProjectsByTeam(teamIds);
            return mapper.Map<IEnumerable<ProjectDto>>(projects);
        }

        public async Task<ProjectDto> Get(int id)
        {
            var project = await repository.SelectAsync(id);
            return mapper.Map<ProjectDto>(project);
        }

        public async Task<IEnumerable<ProjectDto>> GetByContent(string content)
        {
            var project = await repository.GetProjectsByContent(content);
            return mapper.Map<IEnumerable<ProjectDto>>(project);
        }

        public async Task<ProjectDtoCreateResult> Post(ProjectDtoCreate projectDtoCreate)
        {
            var map = mapper.Map<ProjectModel>(projectDtoCreate);
            var item = mapper.Map<ProjectEntity>(map);
            var insertAsync = await repository.InsertAsync(item);
            return mapper.Map<ProjectDtoCreateResult>(insertAsync);
        }

        public async Task<ProjectDtoUpdateResult> Put(ProjectDtoUpdate project)
        {
            var map = mapper.Map<ProjectModel>(project);
            var item = mapper.Map<ProjectEntity>(map);
            var updateAsync = await repository.UpdateAsync(item);
            return mapper.Map<ProjectDtoUpdateResult>(updateAsync);
        }

        public async Task<bool> Delete(int id)
        {
            return await repository.DeleteAsync(id);
        }
    }
}
