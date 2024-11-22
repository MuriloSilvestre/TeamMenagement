using System.ComponentModel.DataAnnotations;

namespace Domain.Dtos.Task
{
    public class TaskStatusDtoUpdate
    {
        [Required(ErrorMessage = "Id é campo Obrigatorio")]
        public int Id { get; set; }

        public int StatusId { get; set; }

    }
}
