using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Mapping
{
    public class UserMap : IEntityTypeConfiguration<UserEntity>
    {
        public void Configure(EntityTypeBuilder<UserEntity> builder)
        {
            builder.ToTable("User");

            builder.HasKey(u => u.Id);

            builder.HasIndex(u => u.Email)
                   .IsUnique();

            builder.Property(u => u.Name)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(u => u.Email)
                   .HasMaxLength(100)
                   .IsRequired();

            builder.Property(u => u.Password)
                   .IsRequired()
                   .HasMaxLength(255);

            builder.Property(c => c.Color)
                   .IsRequired()
                   .HasMaxLength(7);

            builder.Property(u => u.RoleId)
               .IsRequired();

            builder.HasOne(u => u.Role)
                   .WithMany(r => r.User)
                   .HasForeignKey(t => t.RoleId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(u => u.UserChats)
                   .WithOne(uc => uc.User)
                   .HasForeignKey(uc => uc.UserId);

            builder.HasMany(u => u.UserTeams)
                   .WithOne(ut => ut.User)
                   .HasForeignKey(ut => ut.UserId);
        }
    }
}
