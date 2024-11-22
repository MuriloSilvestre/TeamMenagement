using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Mapping
{
    public class TeamProjectMap : IEntityTypeConfiguration<TeamProjectEntity>
    {
        public void Configure(EntityTypeBuilder<TeamProjectEntity> builder)
        {
            builder.ToTable("TeamProject");

            builder.HasKey(tp => tp.Id);

            builder.HasOne(tp => tp.Team)
                    .WithMany(t => t.TeamProjects)
                    .HasForeignKey(tp => tp.TeamId)
                    .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(tp => tp.Project)
                   .WithMany(p => p.TeamProjects)
                   .HasForeignKey(tp => tp.ProjectId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
