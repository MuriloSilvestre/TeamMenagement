using System;
using Domain.Entities;

namespace Domain.Dtos.ProjectStatus
{
    public class ProjectStatusDtoCreateResult
    {
        public int Id { get; set; }
        public int StatusId { get; set; }
        public StatusEntity Status { get; set; }
        public int ProjectId { get; set; }
        public ProjectEntity Project { get; set; }
        public DateTime CreateAt { get; set; }
    }
}
