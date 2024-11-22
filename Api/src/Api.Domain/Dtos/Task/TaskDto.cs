using System;

namespace Domain.Dtos.Task
{
    public class TaskDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime? DueDate { get; set; }
        public int AssignedToUserId { get; set; }
        public int ProjectId { get; set; }
        public int StatusId { get; set; }
        public string Color { get; set; }
    }
}
