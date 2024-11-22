using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Mapping
{
    public class UserTeamMap : IEntityTypeConfiguration<UserTeamEntity>
    {
        public void Configure(EntityTypeBuilder<UserTeamEntity> builder)
        {
            builder.ToTable("UserTeam");

            builder.HasKey(ut => ut.Id);

            builder.HasOne(ut => ut.User)
                    .WithMany(u => u.UserTeams)
                    .HasForeignKey(ut => ut.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(ut => ut.Team)
                   .WithMany(t => t.UserTeams)
                   .HasForeignKey(ut => ut.TeamId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
