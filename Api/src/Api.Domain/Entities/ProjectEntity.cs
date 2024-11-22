using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities {
    public class ProjectEntity : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string Title { get; set; }


        [Required]
        [MaxLength(1000)]
        public string Description { get; set; }

        [Required]
        [MaxLength(7)]
        public string Color { get; set; }

        [Required]
        public bool IsCompleted { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        public DateTime? ActualStartDate { get; set; }

        public DateTime? ActualEndDate { get; set; }

        [Required]
        public string Budget {  get; set; }

        public string ActualCost { get; set; }

        public string Priority { get; set; }

        public string BudgetDocument { get; set; }

        public IEnumerable<TaskEntity> Tasks { get; set; }

        public IEnumerable<TeamProjectEntity> TeamProjects { get; set; }

        public IEnumerable<ProjectStatusEntity> ProjectStatus { get; set; }
    }
}
