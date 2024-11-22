using System;

namespace Domain.Dtos.User
{
    public class UserDtoCreateResult
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int RoleId { get; set; }
        public DateTime CreateAt { get; set; }
        public string Color { get; set; }
    }
}
