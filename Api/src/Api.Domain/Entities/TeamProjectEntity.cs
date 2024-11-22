using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Domain.Entities {
    public class TeamProjectEntity : BaseEntity
    {
        [Required]
        public int TeamId { get; set; }

        [JsonIgnore]
        public TeamEntity Team { get; set; }

        [Required]
        public int ProjectId { get; set; }

        [JsonIgnore]
        public ProjectEntity Project { get; set; }
    }
}
