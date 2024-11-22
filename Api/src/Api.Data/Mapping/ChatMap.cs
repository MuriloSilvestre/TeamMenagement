using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Mapping
{
    public class ChatMap : IEntityTypeConfiguration<ChatEntity>
    {
        public void Configure(EntityTypeBuilder<ChatEntity> builder)
        {
            builder.ToTable("Chat");

            builder.HasKey(c => c.Id);

            builder.Property(c => c.Name)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(c => c.Color)
                   .IsRequired()
                   .HasMaxLength(7);

            builder.HasMany(c => c.UserChats)
                  .WithOne(uc => uc.Chat)
                  .HasForeignKey(uc => uc.ChatId);

            builder.HasMany(c => c.Messages)
                  .WithOne(m => m.Chat)
                  .HasForeignKey(m => m.ChatId);
        }
    }
}
