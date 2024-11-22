using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Domain.Entities {
    public class UserTeamEntity : BaseEntity
    {
        [Required]
        public int UserId { get; set; }

        [JsonIgnore]
        public UserEntity User { get; set; }

        [Required]
        public int TeamId { get; set; }

        [JsonIgnore]
        public TeamEntity Team { get; set; }
    }
}
