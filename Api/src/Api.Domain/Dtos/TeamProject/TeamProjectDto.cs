using Domain.Entities;

namespace Domain.Dtos.TeamProject
{
    public class TeamProjectDto
    {
        public int Id { get; set; }
        public TeamEntity Team { get; set; }
        public int ProjectId { get; set; }
        public ProjectEntity Project { get; set; }
    }
}
