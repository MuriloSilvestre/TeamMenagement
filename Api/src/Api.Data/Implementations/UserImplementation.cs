using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Context;
using Data.Repository;
using Domain.Dtos.User;
using Domain.Entities;
using Domain.Repository;
using Microsoft.EntityFrameworkCore;

namespace Data.Implementations
{
    public class UserImplementation(MyContext context) : BaseRepository<UserEntity>(context), IUserRepository
    {
        private readonly DbSet<UserEntity> _dataset = context.Set<UserEntity>();

        public async Task<DashboardDto> GetDashboard(int id)
        {
            var user = await GetUserAssociations(id);

            return user == null ? SetDashboardEmpty() : await SetDashboardWithData(user);
        }

        private async Task<DashboardDto> SetDashboardWithData(UserEntity user)
        {
            return new DashboardDto
            {
                Projects = await GetProjects(),
                ProjectsByTeams = FilterProjectsByTeams(user),  
                Tasks = await GetTasks(),  
                TasksByProjects = await FilterTasksByProjects(),
                TasksByTeams = FilterTasksByTeams(user),
                TasksByUsers = FilterTasksByUsers(user),
                Teams = await GetTeams(),
                User = await GetUsers()
            };
        }

        private async Task<List<UserEntity>> GetUsers()
        {
            return await Context.Users
                .Include(t => t.Tasks)
                .ToListAsync();
        }

        private async Task<List<TeamEntity>> GetTeams()
        {
            return await Context.Teams
                .Include(t => t.TeamProjects)
                .ThenInclude(tp => tp.Project)
                .ToListAsync();
        }

        private static IEnumerable<TaskEntity> FilterTasksByUsers(UserEntity user)
        {
            return user.Tasks ?? Enumerable.Empty<TaskEntity>();
        }

        private static List<TaskEntity> FilterTasksByTeams(UserEntity user)
        {
            return user.UserTeams?
                .SelectMany(ut => ut.Team.TeamProjects)
                .Select(tp => tp.Project)
                .SelectMany(p=> p.Tasks)
                .Distinct()
                .ToList() ?? new List<TaskEntity>();
        }

        private async Task<List<ProjectEntity>> FilterTasksByProjects()
        {
            return await Context.Projects
                .Include(p => p.Tasks)
                .ToListAsync();
        }

        private async Task<List<TaskEntity>> GetTasks()
        {
            return await Context.Tasks
                .Include(t => t.Status)
                .Include(t => t.Project)
                .ToListAsync();
        }

        private static List<TeamEntity> FilterProjectsByTeams(UserEntity user)
        {
            return user.UserTeams?
                .SelectMany(ut => ut.Team.TeamProjects)
                .Select(tp => tp.Team)
                .Distinct()
                .ToList() ?? new List<TeamEntity>();
        }

        private async Task<List<ProjectEntity>> GetProjects()
        {
            return await Context.Projects
                .Include(p => p.ProjectStatus)
                .ThenInclude(ps => ps.Status)
                .ToListAsync();
        }

        private static DashboardDto SetDashboardEmpty()
        {
            return new DashboardDto
            {
                Projects = Enumerable.Empty<ProjectEntity>(),
                ProjectsByTeams = Enumerable.Empty<TeamEntity>(),
                Tasks = Enumerable.Empty<TaskEntity>(),
                TasksByProjects = Enumerable.Empty<ProjectEntity>(),
                TasksByTeams = Enumerable.Empty<TaskEntity>(),
                TasksByUsers = Enumerable.Empty<TaskEntity>(),
                Teams = Enumerable.Empty<TeamEntity>()
            };
        }

        private async Task<UserEntity> GetUserAssociations(int id)
        {
            return await _dataset.Include(u => u.UserTeams)
                .ThenInclude(ut => ut.Team)
                .ThenInclude(t => t.TeamProjects)
                .ThenInclude(tp => tp.Project)
                .Include(u => u.Tasks)
                .FirstOrDefaultAsync(u => u.Id == id);
        }


        public async Task<UserEntity> FindByLogin(string email)
        {
            return await _dataset.Include(u=>u.Role)
                                 .Include(u=>u.UserTeams)
                                 .FirstOrDefaultAsync(u => u.Email.Equals(email));
        }

        public async Task<IEnumerable<UserEntity>> GetUsersByChat(int chatId)
        {
            return await _dataset.Include(u => u.UserChats)
                                 .Where(u => u.UserChats.All(uc => uc.ChatId != chatId))
                                 .ToListAsync();
        }

        public async Task<IEnumerable<UserEntity>> GetUsersByTeam(int teamId)
        {
            return await _dataset.Include(u => u.UserTeams)
                                 .Where(t => t.UserTeams.All(tp => tp.TeamId != teamId))
                                 .ToListAsync();
        }
    }
}
