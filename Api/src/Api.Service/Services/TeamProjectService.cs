using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Dtos.TeamProject;
using Domain.Entities;
using Domain.Interfaces.Services.TeamProject;
using Domain.Models;
using Domain.Repository;

namespace Service.Services
{
    public class TeamProjectService(ITeamProjectRepository repository, IMapper mapper) : ITeamProjectService
    {
        public async Task<IEnumerable<TeamProjectDto>> GetByTeam(int teamId)
        {
            var teamsProjects = await repository.GetByTeam(teamId);
            return mapper.Map<IEnumerable<TeamProjectDto>>(teamsProjects);
        }

        public async Task<IEnumerable<TeamProjectDto>> GetByProject(int projectId)
        {
            var teamsProjects = await repository.GetByProject(projectId);
            return mapper.Map<IEnumerable<TeamProjectDto>>(teamsProjects);
        }


        public async Task<TeamProjectDto> Get(int id)
        {
            var teamProject = await repository.SelectAsync(id);
            return mapper.Map<TeamProjectDto>(teamProject);
        }

        public async Task<TeamProjectDtoCreateResult> Post(TeamProjectDtoCreate teamProjectDtoCreate)
        {
            var map = mapper.Map<TeamProjectModel>(teamProjectDtoCreate);
            var item = mapper.Map<TeamProjectEntity>(map);
            var insertAsync = await repository.InsertAsync(item);
            return mapper.Map<TeamProjectDtoCreateResult>(insertAsync);
        }

        public async Task<TeamProjectDtoUpdateResult> Put(TeamProjectDtoUpdate teamProject)
        {
            var map = mapper.Map<TeamProjectModel>(teamProject);
            var item = mapper.Map<TeamProjectEntity>(map);
            var updateAsync = await repository.UpdateAsync(item);
            return mapper.Map<TeamProjectDtoUpdateResult>(updateAsync);
        }

        public async Task<bool> Delete(int id)
        {
            return await repository.DeleteAsync(id);
        }
    }
}
