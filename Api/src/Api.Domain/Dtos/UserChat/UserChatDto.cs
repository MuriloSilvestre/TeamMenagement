using Domain.Entities;

namespace Domain.Dtos.UserChat
{
    public class UserChatDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public UserEntity User { get; set; }
        public int ChatId { get; set; }
    }
}
