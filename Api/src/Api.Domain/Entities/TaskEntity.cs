using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Domain.Entities
{
    public class TaskEntity : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string Title { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Description { get; set; }
        
        [Required]
        public bool IsCompleted { get; set; }

        public DateTime? DueDate { get; set; }

        [Required]
        public int StatusId { get; set; }

        public StatusEntity Status { get; set; }

        public int AssignedToUserId { get; set; }
        
        public UserEntity User { get; set; }

        [Required]
        public int ProjectId { get; set; }

        [JsonIgnore]
        public ProjectEntity Project { get; set; }

        [Required]
        [MaxLength(7)]
        public string Color { get; set; }
    }
}
