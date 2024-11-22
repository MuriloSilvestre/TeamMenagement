using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Dtos.Status;
using Domain.Entities;
using Domain.Interfaces.Services.Status;
using Domain.Models;
using Domain.Repository;

namespace Service.Services
{
    public class StatusService(IStatusRepository repository, IMapper mapper) : IStatusService
    {
        public async Task<IEnumerable<StatusDto>> GetAll()
        {
            var statuses = await repository.SelectAsync();
            return mapper.Map<IEnumerable<StatusDto>>(statuses);
        }

        public async Task<StatusDto> Get(int id)
        {
            var status = await repository.SelectAsync(id);
            return mapper.Map<StatusDto>(status);
        }

        public async Task<IEnumerable<StatusDto>> GetByContent(string content)
        {
            var statuses = await repository.GetStatussByContent(content);
            return mapper.Map<IEnumerable<StatusDto>>(statuses);
        }

        public async Task<IEnumerable<StatusDto>> GetByProject(int projectId)
        {
            var statuses = await repository.GetStatusByProject(projectId);
            return mapper.Map<IEnumerable<StatusDto>>(statuses);
        }

        public async Task<StatusDtoCreateResult> Post(StatusDtoCreate roleDtoCreate)
        {
            var map = mapper.Map<StatusModel>(roleDtoCreate);
            var item = mapper.Map<StatusEntity>(map);
            var insertAsync = await repository.InsertAsync(item);
            return mapper.Map<StatusDtoCreateResult>(insertAsync);
        }

        public async Task<StatusDtoUpdateResult> Put(StatusDtoUpdate role)
        {
            var map = mapper.Map<StatusModel>(role);
            var item = mapper.Map<StatusEntity>(map);
            var updateAsync = await repository.UpdateAsync(item);
            return mapper.Map<StatusDtoUpdateResult>(updateAsync);
        }

        public async Task<bool> Delete(int id)
        {
            return await repository.DeleteAsync(id);
        }
    }
}
