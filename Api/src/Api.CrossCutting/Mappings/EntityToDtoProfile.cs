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
using Domain.Entities;

namespace CrossCutting.Mappings
{
    public class EntityToDtoProfile : Profile
    {
        public EntityToDtoProfile()
        {
            
            #region User
            CreateMap<UserDto, UserEntity>()
                .ReverseMap();
            CreateMap<UserDtoCreateResult, UserEntity>()
                .ReverseMap();
            CreateMap<UserDtoUpdateResult, UserEntity>()
                .ReverseMap();
            #endregion

            #region UserTeam
            CreateMap<UserTeamDto, UserTeamEntity>()
               .ReverseMap();
            CreateMap<UserTeamDtoCreateResult, UserTeamEntity>()
                .ReverseMap();
            CreateMap<UserTeamDtoUpdateResult, UserTeamEntity>()
                .ReverseMap();
            #endregion

            #region Team
            CreateMap<TeamDto, TeamEntity>()
               .ReverseMap();
            CreateMap<TeamDtoCreateResult, TeamEntity>()
                .ReverseMap();
            CreateMap<TeamDtoUpdateResult, TeamEntity>()
                .ReverseMap();
            #endregion

            #region TeamProject
            CreateMap<TeamProjectDto, TeamProjectEntity>()
              .ReverseMap();
            CreateMap<TeamProjectDtoCreateResult, TeamProjectEntity>()
                .ReverseMap();
            CreateMap<TeamProjectDtoUpdateResult, TeamProjectEntity>()
                .ReverseMap();
            #endregion

            #region Project
            CreateMap<ProjectDto, ProjectEntity>()
              .ReverseMap();
            CreateMap<ProjectDtoCreateResult, ProjectEntity>()
                .ReverseMap();
            CreateMap<ProjectDtoUpdateResult, ProjectEntity>()
                .ReverseMap();
            #endregion

            #region Task
            CreateMap<TaskDto, TaskEntity>()
              .ReverseMap();
            CreateMap<TaskDtoCreateResult, TaskEntity>()
                .ReverseMap();
            CreateMap<TaskDtoUpdateResult, TaskEntity>()
                .ReverseMap();
            #endregion

            #region Chat
            CreateMap<ChatDto, ChatEntity>()
              .ReverseMap();
            CreateMap<ChatDtoCreateResult, ChatEntity>()
                .ReverseMap();
            CreateMap<ChatDtoUpdateResult, ChatEntity>()
                .ReverseMap();
            #endregion

            #region Message
            CreateMap<MessageDto, MessageEntity>()
              .ReverseMap();
            CreateMap<MessageDtoCreateResult, MessageEntity>()
                .ReverseMap();
            CreateMap<MessageDtoUpdateResult, MessageEntity>()
                .ReverseMap();
            #endregion

            #region UserChat
            CreateMap<UserChatDto, UserChatEntity>()
              .ReverseMap();
            CreateMap<UserChatDtoCreateResult, UserChatEntity>()
                .ReverseMap();
            CreateMap<UserChatDtoUpdateResult, UserChatEntity>()
                .ReverseMap();
            #endregion

            #region Role
            CreateMap<RoleDto, RoleEntity>()
              .ReverseMap();
            CreateMap<RoleDtoCreateResult, RoleEntity>()
                .ReverseMap();
            CreateMap<RoleDtoUpdateResult, RoleEntity>()
                .ReverseMap();
            #endregion

            #region Status
            CreateMap<StatusDto, StatusEntity>()
              .ReverseMap();
            CreateMap<StatusDtoCreateResult, StatusEntity>()
                .ReverseMap();
            CreateMap<StatusDtoUpdateResult, StatusEntity>()
                .ReverseMap();
            #endregion

            #region ProjectStatus
            CreateMap<ProjectStatusDto, ProjectStatusEntity>()
              .ReverseMap();
            CreateMap<ProjectStatusDtoCreateResult, ProjectStatusEntity>()
                .ReverseMap();
            CreateMap<ProjectStatusDtoUpdateResult, ProjectStatusEntity>()
                .ReverseMap();
            #endregion
        }
    }
}
