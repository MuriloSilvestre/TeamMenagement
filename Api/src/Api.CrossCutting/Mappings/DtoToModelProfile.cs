using AutoMapper;
using Domain.Dtos.Chat;
using Domain.Dtos.Message;
using Domain.Dtos.Project;
using Domain.Dtos.ProjectStatus;
using Domain.Dtos.Role;
using Domain.Dtos.Status;
using Domain.Dtos.Task;
using Domain.Dtos.Team;
using Domain.Dtos.TeamProject;
using Domain.Dtos.User;
using Domain.Dtos.UserChat;
using Domain.Dtos.UserTeam;
using Domain.Models;

namespace CrossCutting.Mappings
{
    public class DtoToModelProfile : Profile
    {
        public DtoToModelProfile()
        {
            #region User
            CreateMap<UserModel, UserDto>()
                .ReverseMap();
            CreateMap<UserModel, UserDtoCreate>()
                .ReverseMap();
            CreateMap<UserModel, UserDtoUpdate>()
                .ReverseMap();
            #endregion

            #region UserTeam
            CreateMap<UserTeamModel, UserTeamDto>()
                .ReverseMap();
            CreateMap<UserTeamModel, UserTeamDtoCreate>()
                .ReverseMap();
            CreateMap<UserTeamModel, UserTeamDtoUpdate>()
                .ReverseMap();
            #endregion

            #region Team
            CreateMap<TeamModel, TeamDto>()
                .ReverseMap();
            CreateMap<TeamModel, TeamDtoCreate>()
                .ReverseMap();
            CreateMap<TeamModel, TeamDtoUpdate>()
                .ReverseMap();
            #endregion

            #region TeamProject
            CreateMap<TeamProjectModel, TeamProjectDto>()
                .ReverseMap();
            CreateMap<TeamProjectModel, TeamProjectDtoCreate>()
                .ReverseMap();
            CreateMap<TeamProjectModel, TeamProjectDtoUpdate>()
                .ReverseMap();
            #endregion

            #region Project
            CreateMap<ProjectModel, ProjectDto>()
                .ReverseMap();
            CreateMap<ProjectModel, ProjectDtoCreate>()
                .ReverseMap();
            CreateMap<ProjectModel, ProjectDtoUpdate>()
                .ReverseMap();
            #endregion

            #region TASK
            CreateMap<TaskModel, TaskDto>()
                .ReverseMap();
            CreateMap<TaskModel, TaskDtoCreate>()
                .ReverseMap();
            CreateMap<TaskModel, TaskDtoUpdate>()
                .ReverseMap();
            #endregion


            #region Chat
            CreateMap<ChatModel, ChatDto>()
                .ReverseMap();
            CreateMap<ChatModel, ChatDtoCreate>()
                .ReverseMap();
            CreateMap<ChatModel, ChatDtoUpdate>()
                .ReverseMap();
            #endregion

            #region Message
            CreateMap<MessageModel, MessageDto>()
                 .ReverseMap();
            CreateMap<MessageModel, MessageDtoCreate>()
                .ReverseMap();
            CreateMap<MessageModel, MessageDtoUpdate>()
                .ReverseMap();
            #endregion

            #region UserChat
            CreateMap<UserChatModel, UserChatDto>()
                .ReverseMap();
            CreateMap<UserChatModel, UserChatDtoCreate>()
                .ReverseMap();
            CreateMap<UserChatModel, UserChatDtoUpdate>()
                .ReverseMap();
            #endregion

            #region Role
            CreateMap<RoleModel, RoleDto>()
                .ReverseMap();
            CreateMap<RoleModel, RoleDtoCreate>()
                .ReverseMap();
            CreateMap<RoleModel, RoleDtoUpdate>()
                .ReverseMap();
            #endregion

            #region Status
            CreateMap<StatusModel, StatusDto>()
                .ReverseMap();
            CreateMap<StatusModel, StatusDtoCreate>()
                .ReverseMap();
            CreateMap<StatusModel, StatusDtoUpdate>()
                .ReverseMap();
            #endregion

            #region ProjectStatus
            CreateMap<ProjectStatusModel, ProjectStatusDto>()
                .ReverseMap();
            CreateMap<ProjectStatusModel, ProjectStatusDtoCreate>()
                .ReverseMap();
            CreateMap<ProjectStatusModel, ProjectStatusDtoUpdate>()
                .ReverseMap();
            #endregion

        }

    }
}
