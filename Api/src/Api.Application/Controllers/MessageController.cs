using System;
using System.Net;
using System.Threading.Tasks;
using Domain.Dtos.Message;
using Domain.Interfaces.Services.Message;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController(IMessageService service) : ControllerBase
    {
        public IMessageService Service { get; set; } = service;

        [HttpGet]
        [Route("")]
        public async Task<ActionResult> Get()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var messages = await Service.GetAll();
                return messages == null ? NotFound() : Ok(messages);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }

        }

        [HttpGet]
        [Authorize("Bearer")]
        [Route("user/{userId}")]
        public async Task<ActionResult> GetMessagesByUser(int userId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var messages = await Service.GetMessagesByUser(userId);
                return messages == null
                    ? NotFound(new { message = "Nenhuma Menssagem encontrado para o usuário." })
                    : Ok(messages);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpGet]
        [Authorize("Bearer")]
        [Route("chat/{chatId}")]
        public async Task<ActionResult> GetMessagesByChat(int chatId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var messages = await Service.GetMessagesByChat(chatId);
                return messages == null
                    ? NotFound(new { message = "Nenhuma Menssagem encontrado para o chat." })
                    : Ok(messages);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }
        
        [HttpGet]
        [Authorize("Bearer")]
        [Route("content/{content}")]
        public async Task<ActionResult> GetByContent(string content)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var messages = await Service.GetByContent(content);
                return messages == null
                    ? NotFound(new { message = "Nenhuma Menssagem encontrado com esse nome." })
                    : Ok(messages);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpGet]
        [Route("{id}", Name = "GetMessageWithId")]
        public async Task<ActionResult> Get(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var message = await Service.Get(id);
                return message == null ? NotFound() : Ok(message);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }

        }


        [Authorize("Bearer")]
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] MessageDtoCreate dtoCreate)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var post = await Service.Post(dtoCreate);
                return post == null
                    ? BadRequest()
                    : Created(new Uri(Url.Link("GetMessageWithId", new { id = post.Id })!), post);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize("Bearer")]
        [HttpPut]
        [Route("{id}", Name = "putMessageWithId")]
        public async Task<ActionResult> Put(int id, [FromBody] MessageDtoUpdate dtoUpdate)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var update = await Service.Put(dtoUpdate);
                return update == null ? BadRequest() : Ok(update);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }

        }

        [Authorize("Bearer")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            try
            {
                return Ok(await Service.Delete(id));
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

    }
}
