using System;
using Domain.Entities;

namespace Domain.Dtos.TeamProject
{
    public class TeamProjectDtoCreateResult
    {
        public int Id { get; set; }
        public int TeamId { get; set; }
        public TeamEntity Team {  get; set; } 
        public int ProjectId { get; set; }
        public ProjectEntity Project { get; set; }
        public DateTime CreateAt { get; set; }
    }
}
