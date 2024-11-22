using System.ComponentModel.DataAnnotations;

namespace Domain.Dtos.Team
{
    public class TeamDtoCreate
    {
        [Required(ErrorMessage = "Nome é um campo obrigatório")]
        [StringLength(100, ErrorMessage = "Nome deve ter no máximo {1} caracteres.")]
        public string Name { get; set; }

        public string Description { get; set; }

        public string Color { get; set; }
    }
}
