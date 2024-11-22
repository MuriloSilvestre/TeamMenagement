using Domain.Entities;

namespace Domain.Dtos.UserTeam
{
    public class UserTeamDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public UserEntity User { get; set; }
        public int TeamId { get; set; }
        public TeamEntity Team { get; set; }
    }
}
