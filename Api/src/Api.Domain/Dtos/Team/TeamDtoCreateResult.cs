using System;

namespace Domain.Dtos.Team
{
    public class TeamDtoCreateResult
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreateAt { get; set; }
        public string Color { get; set; }
    }
}
