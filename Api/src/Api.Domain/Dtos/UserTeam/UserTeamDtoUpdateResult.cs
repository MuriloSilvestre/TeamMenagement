using System;

namespace Domain.Dtos.UserTeam
{
    public class UserTeamDtoUpdateResult
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TeamId { get; set; }
        public DateTime UpdateAt { get; set; }
    }
}
