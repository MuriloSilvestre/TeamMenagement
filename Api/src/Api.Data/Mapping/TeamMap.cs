using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Mapping
{
    public class TeamMap : IEntityTypeConfiguration<TeamEntity>
    {
        public void Configure(EntityTypeBuilder<TeamEntity> builder)
        {
            builder.ToTable("Team");

            builder.HasKey(t => t.Id);

            builder.Property(t => t.Name)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(t => t.Description)
                   .IsRequired()
                   .HasMaxLength(1000);

            builder.Property(c => c.Color)
                   .IsRequired()
                   .HasMaxLength(7);

            builder.HasMany(t => t.TeamProjects)
                  .WithOne(tp => tp.Team)
                  .HasForeignKey(tp => tp.TeamId);

            builder.HasMany(t => t.UserTeams)
                  .WithOne(ut => ut.Team)
                  .HasForeignKey(tp => tp.TeamId);
        }
    }
}
