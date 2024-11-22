using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Dtos.Task;
using Domain.Entities;
using Domain.Interfaces.Services.Task;
using Domain.Models;
using Domain.Repository;
using Microsoft.AspNetCore.Http;

namespace Service.Services
{
    public class TaskService(
        ITaskRepository repository,
        IUserRepository userRepository,
        IMapper mapper,
        IHttpContextAccessor httpContextAccessor)
        : ITaskService
    {
        public async Task<IEnumerable<TaskDto>> GetAll(int projectId, int userId)
        {
            var name = httpContextAccessor.HttpContext.User.Identity!.Name;

            var user = await userRepository.FindByLogin(name);

            if (user == null)
            {
                throw new Exception("Usuário não autenticado.");
            }

            var tasks = IsManagement(user) ? await repository.SelectAsync(): HasProjectId(projectId) ? await repository.GetTasksByUser(userId) : await repository.GetTasksByProject(projectId, userId);
            
            return mapper.Map<IEnumerable<TaskDto>>(tasks);
        }

        private static bool HasProjectId(int projectId)
        {
            return projectId == 0;
        }

        private static bool IsManagement(UserEntity user)
        {
            return user.RoleId == 1 || user.RoleId == 2;
        }

        public async Task<TaskDto> Get(int id)
        {
            var task = await repository.SelectAsync(id);
            return mapper.Map<TaskDto>(task);
        }

        public async Task<TaskDto> Get(string title)
        {
            var tasksByTitle = await repository.GetTasksByTitle(title);
            return mapper.Map<TaskDto>(tasksByTitle);
        }

        public async Task<TaskDtoCreateResult> Post(TaskDtoCreate task)
        {
            var map = mapper.Map<TaskModel>(task);
            var item = mapper.Map<TaskEntity>(map);
            var insertAsync = await repository.InsertAsync(item);
            return mapper.Map<TaskDtoCreateResult>(insertAsync);
        }

        public async Task<TaskDtoUpdateResult> PutStatus(TaskStatusDtoUpdate task)
        {
            var item = await repository.SelectAsync(task.Id);
            item.StatusId = task.StatusId;
            var updateAsync = await repository.UpdateAsync(item);
            return mapper.Map<TaskDtoUpdateResult>(updateAsync);
        }

        public async Task<TaskDtoUpdateResult> Put(TaskDtoUpdate task)
        {
            var name = httpContextAccessor.HttpContext.User.Identity!.Name;
            var user = await userRepository.FindByLogin(name);
            if (user == null)
            {
                throw new Exception("Usuário não autenticado.");
            }

            var map = mapper.Map<TaskModel>(task);
            var item = mapper.Map<TaskEntity>(map);
            item.AssignedToUserId = user.Id;
            var updateAsync = await repository.UpdateAsync(item);
            return mapper.Map<TaskDtoUpdateResult>(updateAsync);
        }

        public async Task<bool> Delete(int id)
        {
            return await repository.DeleteAsync(id);
        }
    }
}
