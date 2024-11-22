using System;

namespace Domain.Dtos.Team
{
    public class TeamDtoUpdateResult
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime UpdateAt { get; set; }
        public string Color { get; set; }
    }
}
