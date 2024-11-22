using System.ComponentModel.DataAnnotations;

namespace Domain.Dtos.UserTeam
{
    public class UserTeamDtoUpdate
    {
        [Required(ErrorMessage = "Id é um campo obrigatório")]
        public int Id { get; set; }

        public int UserId { get; set; }

        public int TeamId { get; set; }
    }
}
