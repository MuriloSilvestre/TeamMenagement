using System;
using System.Net;
using System.Threading.Tasks;
using Domain.Dtos.Chat;
using Domain.Interfaces.Services.Chat;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController(IChatService service) : ControllerBase
    {
        public IChatService Service { get; set; } = service;

        [HttpGet]
        [Route("")]
        public async Task<ActionResult> Get()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            try
            {
                var chats = await Service.GetAll();
                return chats == null ? NotFound() : Ok(chats);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }

        }

        [HttpGet]
        [Authorize("Bearer")]
        [Route("user/{userId}")]
        public async Task<ActionResult> GetChatsByUser(int userId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var chat = await Service.GetChatsByUser(userId);
                return chat == null
                    ? NotFound(new { message = "Nenhum Chat encontrado para o usuário." })
                    : Ok(chat);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpGet]
        [Authorize("Bearer")]
        [Route("name/{name}")]
        public async Task<ActionResult> GetByName(string name)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var chat = await Service.GetByName(name);
                return chat == null
                    ? NotFound(new { message = "Nenhum Chat encontrado com esse nome." })
                    : Ok(chat);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpGet]
        [Route("{id}", Name = "GetChatWithId")]
        public async Task<ActionResult> Get(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            try
            {
                var chat = await Service.Get(id);
                return chat == null ? NotFound() : Ok(chat);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }

        }


        [Authorize("Bearer")]
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ChatDtoCreate dtoCreate)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            try
            {
                var chat = await Service.Post(dtoCreate);
                return chat == null
                    ? BadRequest()
                    : Created(new Uri(Url.Link("GetChatWithId", new { id = chat.Id })!), chat);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize("Bearer")]
        [HttpPut]
        [Route("{id}", Name = "putChatWithId")]
        public async Task<ActionResult> Put(int id, [FromBody] ChatDtoUpdate dtoUpdate)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            try
            {
                var chat = await Service.Put(dtoUpdate);
                return chat == null ? BadRequest() : Ok(chat);
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
