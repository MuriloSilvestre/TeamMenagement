using System.ComponentModel.DataAnnotations;

namespace Domain.Dtos.TeamProject
{
    public class TeamProjectDtoUpdate
    {
        [Required(ErrorMessage = "Id é um campo obrigatório")]
        public int Id { get; set; }

        public int TeamId { get; set; }

        public int ProjectId { get; set; }
    }
}
