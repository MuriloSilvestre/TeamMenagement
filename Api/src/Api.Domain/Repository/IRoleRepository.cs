using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;

namespace Domain.Repository
{
    public interface IRoleRepository : IRepository<RoleEntity>
    {
        Task<IEnumerable<RoleEntity>> GetRolesByContent(string keyword);
    }
}
