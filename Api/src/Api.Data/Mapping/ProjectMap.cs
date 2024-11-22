using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Mapping
{
    public class ProjectMap : IEntityTypeConfiguration<ProjectEntity>
    {
        public void Configure(EntityTypeBuilder<ProjectEntity> builder)
        {
            builder.ToTable("Project");

            builder.HasKey(p => p.Id);

            builder.Property(p => p.Title)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(p => p.Description)
                   .IsRequired()
                   .HasMaxLength(1000);

            builder.Property(p => p.IsCompleted)
                   .IsRequired();

            builder.Property(p => p.StartDate)
                   .IsRequired();

            builder.Property(p => p.EndDate)
                   .IsRequired();

            builder.Property(p => p.Color)
                   .IsRequired()
                   .HasMaxLength(7);

            builder.Property(p => p.ActualStartDate)
                   .IsRequired(false);

            builder.Property(p => p.ActualEndDate)
                   .IsRequired(false);

            builder.Property(p => p.Budget)
                   .IsRequired();

            builder.Property(p => p.ActualCost)
                   .IsRequired(false);

            builder.Property(p => p.Priority)
                   .IsRequired(false);

            builder.Property(p => p.BudgetDocument)
                   .IsRequired(false);

        builder.HasMany(p => p.TeamProjects)
                  .WithOne(tp => tp.Project)
                  .HasForeignKey(tp => tp.ProjectId);

            builder.HasMany(p => p.ProjectStatus)
                  .WithOne(tp => tp.Project)
                  .HasForeignKey(tp => tp.ProjectId);

            builder.HasMany(p => p.Tasks)
                  .WithOne(t => t.Project)
                  .HasForeignKey(t => t.ProjectId);
        }
    }
}
