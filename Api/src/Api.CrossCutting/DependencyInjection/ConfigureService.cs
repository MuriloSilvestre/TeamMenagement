using Api.Service.Services;
using Domain.Interfaces.Services.Chat;
using Domain.Interfaces.Services.Message;
using Domain.Interfaces.Services.Project;
using Domain.Interfaces.Services.ProjectStatus;
using Domain.Interfaces.Services.Role;
using Domain.Interfaces.Services.Status;
using Domain.Interfaces.Services.Task;
using Domain.Interfaces.Services.Team;
using Domain.Interfaces.Services.TeamProject;
using Domain.Interfaces.Services.User;
using Domain.Interfaces.Services.UserChat;
using Domain.Interfaces.Services.UserTeam;
using Microsoft.Extensions.DependencyInjection;
using Service.Services;

namespace Api.CrossCutting.DependencyInjection
{
    public class ConfigureService
    {
        public static void ConfigureDependenciesService(IServiceCollection serviceCollection)
        {
            serviceCollection.AddTransient<ILoginService, LoginService>();

            serviceCollection.AddTransient<IChatService, ChatService>();

            serviceCollection.AddTransient<IHomeService, HomeService>();
            
            serviceCollection.AddTransient<IMessageService, MessageService>();

            serviceCollection.AddTransient<IProjectService, ProjectService>();

            serviceCollection.AddTransient<IProjectStatusService, ProjectStatusService>();

            serviceCollection.AddTransient<IRoleService, RoleService>();

            serviceCollection.AddTransient<IStatusService, StatusService>();

            serviceCollection.AddTransient<ITaskService, TaskService>();

            serviceCollection.AddTransient<ITeamService, TeamService>();

            serviceCollection.AddTransient<ITeamProjectService, TeamProjectService>();

            serviceCollection.AddTransient<IUserService, UserService>();

            serviceCollection.AddTransient<IUserChatService, UserChatService>();

            serviceCollection.AddTransient<IUserTeamService, UserTeamService>();
        }
    }
}
