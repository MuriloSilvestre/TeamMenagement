using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Domain.Entities {
    public class ProjectStatusEntity : BaseEntity
    {
        [Required]
        public int StatusId { get; set; }

        [JsonIgnore]
        public StatusEntity Status { get; set; }

        [Required]
        public int ProjectId { get; set; }

        [JsonIgnore]
        public ProjectEntity Project { get; set; }
    }
}
