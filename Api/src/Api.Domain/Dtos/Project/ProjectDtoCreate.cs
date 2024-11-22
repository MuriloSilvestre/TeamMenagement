using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Dtos.Project
{
    public class ProjectDtoCreate
    {
        [Required(ErrorMessage = "Nome é um campo obrigatório")]
        [StringLength(100, ErrorMessage = "Nome deve ter no máximo {1} caracteres.")]
        public string Title { get; set; }

        public string Description { get; set; }

        public bool IsCompleted { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        [Required(ErrorMessage = "Cor é um campo obrigatório")]
        public string Color { get; set; }

        public DateTime? ActualStartDate { get; set; }
        
        public DateTime? ActualEndDate { get; set; }
        
        [Required(ErrorMessage = "Orçamento é um campo obrigatório")]
        public string Budget { get; set; }
        
        public string ActualCost { get; set; }
        
        public string Priority { get; set; }
        
        public string BudgetDocument { get; set; }


    }
}
