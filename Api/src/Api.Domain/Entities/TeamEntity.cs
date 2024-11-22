using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities {
    public class TeamEntity : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        
        [Required]
        [MaxLength(1000)]
        public string Description { get; set; }

        public IEnumerable<TeamProjectEntity> TeamProjects { get; set; }

        public IEnumerable<UserTeamEntity> UserTeams { get; set; }

        [Required]
        [MaxLength(7)]
        public string Color { get; set; }
    }
}
