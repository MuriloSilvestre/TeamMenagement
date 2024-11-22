using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Dtos.Role;
using Domain.Entities;
using Domain.Interfaces.Services.Role;
using Domain.Models;
using Domain.Repository;

namespace Service.Services
{
    public class RoleService(
        IRoleRepository repository,
        IMapper mapper)
        : IRoleService
    {
        public async Task<IEnumerable<RoleDto>> GetAll()
        {
            var roles = await repository.SelectAsync();
            return mapper.Map<IEnumerable<RoleDto>>(roles);
        }

        public async Task<RoleDto> Get(int id)
        {
            var role = await repository.SelectAsync(id);
            return mapper.Map<RoleDto>(role);
        }

        public async Task<IEnumerable<RoleDto>> GetByContent(string content)
        {
            var role = await repository.GetRolesByContent(content);
            return mapper.Map<IEnumerable<RoleDto>>(role);
        }

        public async Task<RoleDtoCreateResult> Post(RoleDtoCreate roleDtoCreate)
        {
            var map = mapper.Map<RoleModel>(roleDtoCreate);
            var item = mapper.Map<RoleEntity>(map);
            var insertAsync = await repository.InsertAsync(item);
            return mapper.Map<RoleDtoCreateResult>(insertAsync);
        }

        public async Task<RoleDtoUpdateResult> Put(RoleDtoUpdate role)
        {
            var map = mapper.Map<RoleModel>(role);
            var item = mapper.Map<RoleEntity>(map);
            var updateAsync = await repository.UpdateAsync(item);
            return mapper.Map<RoleDtoUpdateResult>(updateAsync);
        }

        public async Task<bool> Delete(int id)
        {
            return await repository.DeleteAsync(id);
        }
    }
}
