using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Mapping
{
    public class StatusMap : IEntityTypeConfiguration<StatusEntity>
    {
        public void Configure(EntityTypeBuilder<StatusEntity> builder)
        {
            builder.ToTable("Status");

            builder.HasKey(r => r.Id);

            builder.Property(r => r.Name)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(c => c.Color)
                   .IsRequired()
                   .HasMaxLength(7);

            builder.HasMany(p => p.ProjectStatus)
                  .WithOne(tp => tp.Status)
                  .HasForeignKey(tp => tp.StatusId);

        }
    }
}
