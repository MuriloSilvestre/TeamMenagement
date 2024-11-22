using System;
using Domain.Entities;

namespace Domain.Dtos.TeamProject
{
    public class TeamProjectDtoUpdateResult
    {
        public int Id { get; set; }
        public TeamEntity Team { get; set; }
        public int ProjectId { get; set; }
        public ProjectEntity Project { get; set; }
        public DateTime UpdateAt { get; set; }
    }
}
