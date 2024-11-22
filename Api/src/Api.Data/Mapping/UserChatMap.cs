using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Mapping
{
    public class UserChatMap : IEntityTypeConfiguration<UserChatEntity>
    {
        public void Configure(EntityTypeBuilder<UserChatEntity> builder)
        {
            builder.ToTable("UserChat");

            builder.HasKey(uc => uc.Id);

            builder.HasOne(uc => uc.User)
                    .WithMany(u => u.UserChats)
                    .HasForeignKey(uc => uc.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(uc => uc.Chat)
                   .WithMany(c => c.UserChats)
                   .HasForeignKey(uc => uc.ChatId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
