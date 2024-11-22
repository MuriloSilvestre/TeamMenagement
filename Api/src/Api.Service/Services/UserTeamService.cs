using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Dtos.UserTeam;
using Domain.Entities;
using Domain.Interfaces.Services.UserTeam;
using Domain.Models;
using Domain.Repository;

namespace Api.Service.Services
{
    public class UserTeamService(IUserTeamRepository repository, IMapper mapper) : IUserTeamService
    {
        public async Task<IEnumerable<UserTeamDto>> GetByTeam(int teamId)
        {
            var usersTeams = await repository.GetByTeam(teamId);
            return mapper.Map<IEnumerable<UserTeamDto>>(usersTeams);
        }

        public async Task<IEnumerable<UserTeamDto>> GetByUser(int userId)
        {
            var usersTeams = await repository.GetByUser(userId);
            return mapper.Map<IEnumerable<UserTeamDto>>(usersTeams);
        }

        public async Task<UserTeamDto> Get(int id)
        {
            var userTeam = await repository.SelectAsync(id);
            return mapper.Map<UserTeamDto>(userTeam);
        }

        public async Task<UserTeamDtoCreateResult> Post(UserTeamDtoCreate userTeamDtoCreate)
        {
            var map = mapper.Map<UserTeamModel>(userTeamDtoCreate);
            var item = mapper.Map<UserTeamEntity>(map);
            var insertAsync = await repository.InsertAsync(item);
            return mapper.Map<UserTeamDtoCreateResult>(insertAsync);
        }

        public async Task<UserTeamDtoUpdateResult> Put(UserTeamDtoUpdate userTeam)
        {
            var map = mapper.Map<UserTeamModel>(userTeam);
            var item = mapper.Map<UserTeamEntity>(map);
            var updateAsync = await repository.UpdateAsync(item);
            return mapper.Map<UserTeamDtoUpdateResult>(updateAsync);
        }

        public async Task<bool> Delete(int id)
        {
            return await repository.DeleteAsync(id);
        }
    }
}
