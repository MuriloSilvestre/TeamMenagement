using System.ComponentModel.DataAnnotations;

namespace Domain.Dtos.User
{
    public class UserDtoCreate
    {
        [Required(ErrorMessage = "Nome é um campo obrigatório")]
        [StringLength(100, ErrorMessage = "Nome deve ter no máximo {1} caracteres.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Email é um campo obrigatório")]
        [EmailAddress(ErrorMessage = "E-mail em formato inválido.")]
        [StringLength(100, ErrorMessage = "Email deve ter no máximo {1} caracteres.")]
        public string Email { get; set; }

        public int RoleId {  get; set; }

        [Required(ErrorMessage = "Senha é um campo obrigatório")]
        [StringLength(255, ErrorMessage = "Senha deve ter no máximo {1} caracteres.")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Senha é um campo obrigatório")]
        [StringLength(255, ErrorMessage = "Senha deve ter no máximo {1} caracteres.")]
        public string NewPassword { get; set; }

        public string Color { get; set; }
    }
}
