using System.Collections.Generic;
using Domain.Entities;

namespace Domain.Dtos.User
{
    public class DashboardDto
    {
        public IEnumerable<ProjectEntity> Projects { get; set; }
        public IEnumerable<TeamEntity> ProjectsByTeams { get; set; }
        public IEnumerable<ProjectEntity> TasksByProjects { get; set; }
        public IEnumerable<TaskEntity> Tasks { get; set; }
        public IEnumerable<UserEntity> User { get; set; }
        public IEnumerable<TaskEntity> TasksByTeams { get; set; }
        public IEnumerable<TaskEntity> TasksByUsers { get; set; }
        public IEnumerable<TeamEntity> Teams { get; set; }
    }
}
