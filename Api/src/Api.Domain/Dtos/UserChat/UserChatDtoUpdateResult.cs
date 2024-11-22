using System;

namespace Domain.Dtos.UserChat
{
    public class UserChatDtoUpdateResult
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ChatId { get; set; }
        public DateTime UpdateAt { get; set; }
    }
}
