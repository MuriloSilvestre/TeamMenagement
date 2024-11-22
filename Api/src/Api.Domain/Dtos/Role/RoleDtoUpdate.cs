using System.ComponentModel.DataAnnotations;

namespace Domain.Dtos.Role
{
    public class RoleDtoUpdate
    {
        [Required(ErrorMessage = "Id é um campo obrigatório")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Nome é um campo obrigatório")]
        [StringLength(100, ErrorMessage = "Nome deve ter no máximo {1} caracteres.")]
        public string Name { get; set; }

    }
}
