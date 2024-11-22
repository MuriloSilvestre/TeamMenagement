using System.ComponentModel.DataAnnotations;

namespace Domain.Dtos.Message
{
    public class MessageDtoUpdate
    {
        [Required(ErrorMessage = "Id é um campo obrigatório")]
        public int Id { get; set; }

        [Required(ErrorMessage = "A mensagem deve conter texto")]
        [StringLength(2000, ErrorMessage = "A mensagem deve ter no máximo {1} caracteres.")]
        public string Content { get; set; }

        public int ChatId { get; set; }
    }
}
