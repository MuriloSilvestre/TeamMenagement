using System;
using Data.Mapping;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data.Context
{
    public class MyContext : DbContext
    {
        public DbSet<UserEntity> Users { get; set; }
        public DbSet<ChatEntity> Chats { get; set; }
        public DbSet<MessageEntity> Messages { get; set; }
        public DbSet<TeamEntity> Teams { get; set; }
        public DbSet<TeamProjectEntity> TeamProjects { get; set; }
        public DbSet<ProjectEntity> Projects { get; set; }
        public DbSet<TaskEntity> Tasks { get; set; }
        public DbSet<UserChatEntity> UserChats { get; set; }
        public DbSet<UserTeamEntity> UserTeams { get; set; }
        public DbSet<RoleEntity> Roles { get; set; }
        public DbSet<StatusEntity> Status { get; set; }
        public DbSet<ProjectStatusEntity> ProjectStatus { get; set; }

        public MyContext(DbContextOptions<MyContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserEntity>(new UserMap().Configure);
            modelBuilder.Entity<ChatEntity>(new ChatMap().Configure);
            modelBuilder.Entity<MessageEntity>(new MessageMap().Configure);
            modelBuilder.Entity<TaskEntity>(new TaskMap().Configure);
            modelBuilder.Entity<TeamEntity>(new TeamMap().Configure);
            modelBuilder.Entity<TeamProjectEntity>(new TeamProjectMap().Configure);
            modelBuilder.Entity<ProjectEntity>(new ProjectMap().Configure);
            modelBuilder.Entity<UserChatEntity>(new UserChatMap().Configure);
            modelBuilder.Entity<UserTeamEntity>(new UserTeamMap().Configure);
            modelBuilder.Entity<RoleEntity>(new RoleMap().Configure);     
            modelBuilder.Entity<StatusEntity>(new StatusMap().Configure);     
            modelBuilder.Entity<ProjectStatusEntity>(new ProjectStatusMap().Configure);     

            modelBuilder.Entity<RoleEntity>().HasData(
                new RoleEntity
                {
                    Id = 1,
                    Name = "Administrador",
                    CreateAt = DateTime.Now,
                    UpdateAt = DateTime.Now,
                }
            );

            modelBuilder.Entity<UserEntity>().HasData(
                new UserEntity
                {
                    Id = 1,
                    Name = "Administrador",
                    Email = "adm@mail.com",
                    RoleId = 1,
                    Color = "#f15353",
                    Password = BCrypt.Net.BCrypt.HashPassword("abc123"),
                    CreateAt = DateTime.Now,
                    UpdateAt = DateTime.Now,
                }
            );

        }
    }
}
