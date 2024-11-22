using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Mapping
{
    public class ProjectStatusMap : IEntityTypeConfiguration<ProjectStatusEntity>
    {
        public void Configure(EntityTypeBuilder<ProjectStatusEntity> builder)
        {
            builder.ToTable("ProjectStatus");

            builder.HasKey(tp => tp.Id);

            builder.HasOne(tp => tp.Status)
                    .WithMany(t => t.ProjectStatus)
                    .HasForeignKey(tp => tp.StatusId)
                    .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(tp => tp.Project)
                   .WithMany(p => p.ProjectStatus)
                   .HasForeignKey(tp => tp.ProjectId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
