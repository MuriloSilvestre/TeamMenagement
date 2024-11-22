using System.ComponentModel.DataAnnotations;

namespace Domain.Dtos.UserChat
{
    public class UserChatDtoUpdate
    {
        [Required(ErrorMessage = "Id é um campo obrigatório")]
        public int Id { get; set; }

        public int UserId { get; set; }

        public int ChatId { get; set; }
    }
}
