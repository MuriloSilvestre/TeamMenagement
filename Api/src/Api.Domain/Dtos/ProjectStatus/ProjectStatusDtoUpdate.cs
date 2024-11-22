using System.ComponentModel.DataAnnotations;

namespace Domain.Dtos.ProjectStatus
{
    public class ProjectStatusDtoUpdate
    {
        [Required(ErrorMessage = "Id é um campo obrigatório")]
        public int Id { get; set; }

        public int StatusId { get; set; }

        public int ProjectId { get; set; }
    }
}
