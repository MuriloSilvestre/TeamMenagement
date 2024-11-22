using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Dtos.Role;

namespace Domain.Interfaces.Services.Role
{
    public interface IRoleService
    {
        Task<RoleDto> Get(int id);
        Task<IEnumerable<RoleDto>> GetByContent(string content);
        Task<IEnumerable<RoleDto>> GetAll();
        Task<RoleDtoCreateResult> Post(RoleDtoCreate role);
        Task<RoleDtoUpdateResult> Put(RoleDtoUpdate role);
        Task<bool> Delete(int id);
    }
}
