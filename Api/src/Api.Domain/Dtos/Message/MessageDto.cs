using System;
using Domain.Entities;

namespace Domain.Dtos.Message
{
    public class MessageDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Timestamp { get; set; }
        public int UserId { get; set; }
        public int ChatId { get; set; }
        public UserEntity User { get; set; }
    }
}
