using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Mapping
{
    public class MessageMap : IEntityTypeConfiguration<MessageEntity>
    {
        public void Configure(EntityTypeBuilder<MessageEntity> builder)
        {
            builder.ToTable("Message");

            builder.HasKey(m => m.Id);

            builder.Property(m => m.Content)
                   .IsRequired()
                   .HasMaxLength(2000);

            builder.Property(m => m.Timestamp)
                   .IsRequired();

            builder.HasOne(m => m.User)
                   .WithMany(u => u.Messages) 
                   .HasForeignKey(m => m.UserId)
                   .IsRequired()
                   .OnDelete(DeleteBehavior.Cascade); 

            builder.HasOne(m => m.Chat)
                   .WithMany(c => c.Messages) 
                   .HasForeignKey(m => m.ChatId)
                   .IsRequired()
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
