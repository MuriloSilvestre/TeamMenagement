using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Domain.Entities {
    public class UserChatEntity : BaseEntity
    {
        [Required]
        public int UserId { get; set; }

        [JsonIgnore]
        public UserEntity User { get; set; }

        [Required]
        public int ChatId { get; set; }

        [JsonIgnore]
        public ChatEntity Chat { get; set; }
    }
}
