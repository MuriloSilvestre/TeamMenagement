using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Domain.Entities {
    public class MessageEntity : BaseEntity
    {
        [Required]
        [MaxLength(2000)]
        public string Content { get; set; }
        
        public DateTime Timestamp { get; set; }

        [Required]
        public int UserId { get; set; }

        public UserEntity User { get; set; }

        [Required]
        public int ChatId { get; set; }

        [JsonIgnore]
        public ChatEntity Chat { get; set; }
    }
}
