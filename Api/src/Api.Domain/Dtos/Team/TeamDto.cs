using Domain.Entities;
using System.Collections.Generic;

namespace Domain.Dtos.Team
{
    public class TeamDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Color { get; set; }
        public IEnumerable<UserTeamEntity> UserTeams { get; set; }
    }
}
