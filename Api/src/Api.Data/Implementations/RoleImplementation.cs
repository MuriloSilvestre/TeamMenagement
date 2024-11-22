using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Context;
using Data.Repository;
using Domain.Entities;
using Domain.Repository;
using Microsoft.EntityFrameworkCore;

namespace Data.Implementations
{
    public class RoleImplementation(MyContext context) : BaseRepository<RoleEntity>(context), IRoleRepository
    {
        private readonly DbSet<RoleEntity> _dataset = context.Set<RoleEntity>();

        public async Task<IEnumerable<RoleEntity>> GetRolesByContent(string keyword)
        {
            return await _dataset
                         .Where(r => r.Name.Contains(keyword))
                         .ToListAsync();
        }

    }
}
