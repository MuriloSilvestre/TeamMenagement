using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Dtos.Task
{
    public class TaskDtoUpdate
    {

        [Required(ErrorMessage = "Id é campo Obrigatorio")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Titulo é campo obrigatório")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Deve ser informado se a tarefa já foi completa")]
        public bool IsCompleted { get; set; }

        public string Description { get; set; }

        public DateTime? DueDate { get; set; }

        public int StatusId { get; set; }

        public int ProjectId { get; set; }

        public int AssignedToUserId { get; set; }

        public string Color { get; set; }
    }
}
