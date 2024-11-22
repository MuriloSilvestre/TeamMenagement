using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Dtos.Message;
using Domain.Entities;
using Domain.Interfaces.Services.Message;
using Domain.Models;
using Domain.Repository;
using Microsoft.AspNetCore.Http;

namespace Service.Services
{
    public class MessageService(
        IMessageRepository repository,
        IUserRepository userRepository, 
        IMapper mapper,
        IHttpContextAccessor httpContextAccessor
        ) : IMessageService
    {
        public async Task<IEnumerable<MessageDto>> GetAll()
        {
            var messages = await repository.SelectAsync();
            return mapper.Map<IEnumerable<MessageDto>>(messages);
        }

        public async Task<IEnumerable<MessageDto>> GetMessagesByUser(int userId)
        {
            var messages = await repository.GetMessagesByUser(userId);
            return mapper.Map<IEnumerable<MessageDto>>(messages);
        }
        public async Task<IEnumerable<MessageDto>> GetMessagesByChat(int chatId)
        {
            var messages = await repository.GetMessagesByChat(chatId);
            return mapper.Map<IEnumerable<MessageDto>>(messages);
        }

        public async Task<MessageDto> Get(int id)
        {
            var message = await repository.SelectAsync(id);
            return mapper.Map<MessageDto>(message);
        }

        public async Task<IEnumerable<MessageDto>> GetByContent(string content)
        {
            var messagesByContent = await repository.GetMessagesByContent(content);
            return mapper.Map<IEnumerable<MessageDto>>(messagesByContent);
        }

        public async Task<MessageDtoCreateResult> Post(MessageDtoCreate messageDtoCreate)
        {
            var name = httpContextAccessor.HttpContext.User.Identity!.Name;
            var user = await userRepository.FindByLogin(name);
            if (user == null)
            {
                throw new Exception("Usuário não autenticado.");
            }

            var map = mapper.Map<MessageModel>(messageDtoCreate);
            var item = mapper.Map<MessageEntity>(map);
            item.UserId = user.Id;
            item.Timestamp = DateTime.UtcNow;
            var insertAsync = await repository.InsertAsync(item);
            return mapper.Map<MessageDtoCreateResult>(insertAsync);
        }

        public async Task<MessageDtoUpdateResult> Put(MessageDtoUpdate message)
        {
            var name = httpContextAccessor.HttpContext.User.Identity!.Name;
            var user = await userRepository.FindByLogin(name);
            if (user == null)
            {
                throw new Exception("Usuário não autenticado.");
            }

            var map = mapper.Map<MessageModel>(message);
            var item = mapper.Map<MessageEntity>(map);
            item.UserId = user.Id;
            item.Timestamp = DateTime.UtcNow;
            var updateAsync = await repository.UpdateAsync(item);
            return mapper.Map<MessageDtoUpdateResult>(updateAsync);
        }

        public async Task<bool> Delete(int id)
        {
            return await repository.DeleteAsync(id);
        }
    }
}
