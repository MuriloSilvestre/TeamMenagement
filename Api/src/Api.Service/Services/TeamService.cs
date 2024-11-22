using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Dtos.Team;
using Domain.Entities;
using Domain.Interfaces.Services.Team;
using Domain.Models;
using Domain.Repository;

namespace Service.Services
{
    public class TeamService(ITeamRepository repository, IMapper mapper) : ITeamService
    {
        public async Task<IEnumerable<TeamDto>> GetAll()
        {
            var teams = await repository.Select();
            return mapper.Map<IEnumerable<TeamDto>>(teams);
        }

        public async Task<TeamDto> Get(int id)
        {
            var team = await repository.SelectAsync(id);
            return mapper.Map<TeamDto>(team);
        }

        public async Task<IEnumerable<TeamDto>> GetByContent(string content)
        {
            var teamsByContent = await repository.GetTeamsByContent(content);
            return mapper.Map<IEnumerable<TeamDto>>(teamsByContent);
        }

        public async Task<IEnumerable<TeamDto>> GetByProject(int projectId)
        {
            var teamsByProject = await repository.GetTeamsByProject(projectId);
            return mapper.Map<IEnumerable<TeamDto>>(teamsByProject);
        }

        public async Task<IEnumerable<TeamDto>> GetByUser(int userId)
        {
            var teamsByUser = await repository.GetTeamsByUser(userId);
            return mapper.Map<IEnumerable<TeamDto>>(teamsByUser);
        }

        public async Task<TeamDtoCreateResult> Post(TeamDtoCreate teamDtoCreate)
        {
            var map = mapper.Map<TeamModel>(teamDtoCreate);
            var item = mapper.Map<TeamEntity>(map);
            var insertAsync = await repository.InsertAsync(item);
            return mapper.Map<TeamDtoCreateResult>(insertAsync);
        }

        public async Task<TeamDtoUpdateResult> Put(TeamDtoUpdate team)
        {
            var map = mapper.Map<TeamModel>(team);
            var item = mapper.Map<TeamEntity>(map);
            var updateAsync = await repository.UpdateAsync(item);
            return mapper.Map<TeamDtoUpdateResult>(updateAsync);
        }

        public async Task<bool> Delete(int id)
        {
            return await repository.DeleteAsync(id);
        }

        public List<int> GetTeamIdList(string teamIds)
        {
            return teamIds.Split(',').Select(id => int.TryParse(id, out var n) ? n : (int?)null)
                .Where(n => n.HasValue)
                .Select(n => n.Value)
                .ToList();
        }
    }
}
