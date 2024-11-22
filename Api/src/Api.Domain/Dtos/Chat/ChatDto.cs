using System.Collections.Generic;
using Domain.Entities;

namespace Domain.Dtos.Chat
{
    public class ChatDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public IEnumerable<MessageEntity> Messages { get; set; }
    }
}
