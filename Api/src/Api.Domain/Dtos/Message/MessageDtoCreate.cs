using System.ComponentModel.DataAnnotations;

namespace Domain.Dtos.Message
{
    public class MessageDtoCreate
    {
        [Required(ErrorMessage = "A mensagem deve conter texto")]
        [StringLength(2000, ErrorMessage = "A mensagem deve ter no máximo {1} caracteres.")]
        public string Content { get; set; }

        public int ChatId { get; set; }
    }
}
