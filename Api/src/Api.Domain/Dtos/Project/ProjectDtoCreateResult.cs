using System;
using System.Collections.Generic;
using Domain.Entities;

namespace Domain.Dtos.Project
{
    public class ProjectDtoCreateResult
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime CreateAt { get; set; }
        public string Color { get; set; }
        public DateTime? ActualStartDate { get; set; }
        public DateTime? ActualEndDate { get; set; }
        public string Budget { get; set; }
        public string ActualCost { get; set; }
        public string Priority { get; set; }
        public string BudgetDocument { get; set; }
        public IEnumerable<TeamProjectEntity> TeamProjects { get; set; }
    }
}
