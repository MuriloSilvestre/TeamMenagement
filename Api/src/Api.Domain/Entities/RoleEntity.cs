using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Domain.Entities {
    public class RoleEntity : BaseEntity 
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [JsonIgnore]
        public IEnumerable<UserEntity> User { get; set; }
    }
}
