using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Domain.Entities {
    public class UserEntity : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [MaxLength(100)]
        public string Email { get; set; }

        [Required]
        public int RoleId { get; set; }

        [Required]
        [MaxLength(255)]
        public string Password { get; set; }

        public RoleEntity Role { get; set; }

        [JsonIgnore]
        public IEnumerable<TaskEntity> Tasks { get; set; }

        public IEnumerable<UserChatEntity> UserChats { get; set; }

        public IEnumerable<UserTeamEntity> UserTeams { get; set; }
        
        [JsonIgnore]
        public IEnumerable<MessageEntity> Messages { get; set; }

        [Required]
        [MaxLength(7)]
        public string Color { get; set; }
    }
}
