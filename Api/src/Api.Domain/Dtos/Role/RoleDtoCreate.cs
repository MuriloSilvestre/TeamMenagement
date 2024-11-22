using System.ComponentModel.DataAnnotations;

namespace Domain.Dtos.Role
{
    public class RoleDtoCreate
    {
        [Required(ErrorMessage = "Nome é um campo obrigatório")]
        [StringLength(100, ErrorMessage = "Nome deve ter no máximo {1} caracteres.")]
        public string Name { get; set; }
    }
}
