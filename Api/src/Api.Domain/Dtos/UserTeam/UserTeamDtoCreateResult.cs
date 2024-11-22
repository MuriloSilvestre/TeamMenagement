using System;

namespace Domain.Dtos.UserTeam
{
    public class UserTeamDtoCreateResult
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TeamId { get; set; }
        public DateTime CreateAt { get; set; }
    }
}
