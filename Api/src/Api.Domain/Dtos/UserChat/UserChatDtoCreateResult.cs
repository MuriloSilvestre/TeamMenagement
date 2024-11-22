using System;

namespace Domain.Dtos.UserChat
{
    public class UserChatDtoCreateResult
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ChatId { get; set; }
        public DateTime CreateAt { get; set; }
    }
}
