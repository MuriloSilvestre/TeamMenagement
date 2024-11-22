using AutoMapper;
using Domain.Entities;
using Domain.Models;

namespace CrossCutting.Mappings
{
    public class ModelToEntityProfile : Profile
    {
        public ModelToEntityProfile()
        {
            #region User
            CreateMap<UserModel, UserEntity>()
              .ReverseMap();
            #endregion

            #region UserTeam
            CreateMap<UserTeamModel, UserTeamEntity>()
               .ReverseMap();
            #endregion

            #region Team
            CreateMap<TeamModel, TeamEntity>()
               .ReverseMap();
            #endregion

            #region TeamProject
            CreateMap<TeamProjectModel, TeamProjectEntity>()
               .ReverseMap();
            #endregion

            #region Project
            CreateMap<ProjectModel, ProjectEntity>()
               .ReverseMap();
            #endregion

            #region Task
            CreateMap<TaskModel, TaskEntity>()
               .ReverseMap();
            #endregion

            #region Chat
            CreateMap<ChatModel, ChatEntity>()
               .ReverseMap();
            #endregion

            #region Message
            CreateMap<MessageModel, MessageEntity>()
               .ReverseMap();
            #endregion

            #region UserChat
            CreateMap<UserChatModel, UserChatEntity>()
               .ReverseMap();
            #endregion

            #region Role
            CreateMap<RoleModel, RoleEntity>()
               .ReverseMap();
            #endregion

            #region Status
            CreateMap<StatusModel, StatusEntity>()
               .ReverseMap();
            #endregion

            #region ProjectStatus
            CreateMap<ProjectStatusModel, ProjectStatusEntity>()
               .ReverseMap();
            #endregion
        }
    }
}
