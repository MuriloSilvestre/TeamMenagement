using System;

namespace Domain.Dtos.Message
{
    public class MessageDtoUpdateResult
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Timestamp { get; set; }
        public string UserName { get; set; }
    }
}
