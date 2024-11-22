using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Domain.Entities {
    public class ChatEntity : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [MaxLength(7)]
        public string Color { get; set; }

        [JsonIgnore]
        public IEnumerable<MessageEntity> Messages { get; set; }

        [JsonIgnore]
        public IEnumerable<UserChatEntity> UserChats { get; set; }
    }
}
