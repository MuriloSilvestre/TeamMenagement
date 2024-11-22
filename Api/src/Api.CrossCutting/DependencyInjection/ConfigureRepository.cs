using System;
using Data.Context;
using Data.Implementations;
using Data.Repository;
using Domain.Interfaces;
using Domain.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace CrossCutting.DependencyInjection
{
    public class ConfigureRepository
    {
        public static void ConfigureDependenciesRepository(IServiceCollection serviceCollection)
        {
            serviceCollection.AddScoped(typeof(IRepository<>), typeof(BaseRepository<>));
            serviceCollection.AddScoped<IChatRepository, ChatImplementation>();

            serviceCollection.AddScoped<IMessageRepository, MessageImplementation>();
            
            serviceCollection.AddScoped<IProjectRepository, ProjectImplementation>();

            serviceCollection.AddScoped<IProjectStatusRepository, ProjectStatusImplementation>();
            
            serviceCollection.AddScoped<IRoleRepository, RoleImplementation>();

            serviceCollection.AddScoped<IStatusRepository, StatusImplementation>();
            
            serviceCollection.AddScoped<ITaskRepository, TaskImplementation>();

            serviceCollection.AddScoped<ITeamRepository, TeamImplementation>();
            
            serviceCollection.AddScoped<ITeamProjectRepository, TeamProjectImplementation>();
            
            serviceCollection.AddScoped<IUserRepository, UserImplementation>();
            
            serviceCollection.AddScoped<IUserChatRepository, UserChatImplementation>();
            
            serviceCollection.AddScoped<IUserTeamRepository, UserTeamImplementation>();

            if (Environment.GetEnvironmentVariable("DATABASE")!.ToLower() == "SQLSERVER".ToLower())
            {
                serviceCollection.AddDbContext<MyContext>(
                    options => options.UseSqlServer(Environment.GetEnvironmentVariable("DB_CONNECTION"))
                );
            }
            else
            {
                serviceCollection.AddDbContext<MyContext>(
                options => options.UseMySql(Environment.GetEnvironmentVariable("DB_CONNECTION"),
                    new MySqlServerVersion(new Version(8, 0, 21))));
            }


        }
    }
}
