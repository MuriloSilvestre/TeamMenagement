using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Domain.Entities {
    public class StatusEntity : BaseEntity 
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [MaxLength(7)]
        public string Color { get; set; }

        [JsonIgnore]
        public IEnumerable<TaskEntity> Task { get; set; }

        [JsonIgnore]
        public IEnumerable<ProjectStatusEntity> ProjectStatus { get; set; }
    }
}
