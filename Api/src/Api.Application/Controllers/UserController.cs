using System;
using System.Net;
using System.Threading.Tasks;
using Domain.Dtos.User;
using Domain.Interfaces.Services.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(IUserService service) : ControllerBase
    {
        public IUserService Service { get; set; } = service;

        [HttpGet]
        [Route("")]
        public async Task<ActionResult> Get()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var users = await Service.GetAll();
                return users == null ? NotFound() : Ok(users);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }

        }

        [HttpGet]
        [Authorize("Bearer")]
        [Route("team/{teamId}")]
        public async Task<ActionResult> GetByProject(int teamId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var users = await Service.GetByTeam(teamId);
                return users == null
                    ? NotFound(new { message = "Nenhum Usuário encontrado para a Equipe." })
                    : Ok(users);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpGet]
        [Authorize("Bearer")]
        [Route("chat/{chatId}")]
        public async Task<ActionResult> GetByChat(int chatId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var users = await Service.GetByChat(chatId);
                return users == null
                    ? NotFound(new { message = "Nenhum Usuário encontrado para a Equipe." })
                    : Ok(users);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize("Bearer")]
        [HttpGet("email={email}")]
        public async Task<ActionResult> GetUsersByEmail(string email)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var user = await Service.GetByEmail(email);
                return user == null
                    ? NotFound(new { message = "Nenhuma usuário encontrada para esse e-mail." })
                    : Ok(user);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }


        [HttpGet]
        [Route("{id}", Name = "GetUserWithId")]
        public async Task<ActionResult> Get(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var user = await Service.Get(id);
                return user == null ? NotFound() : Ok(user);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }

        }


        [Authorize("Bearer")]
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] UserDtoCreate dtoCreate)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var post = await Service.Post(dtoCreate);
                return post == null
                    ? BadRequest()
                    : Created(new Uri(Url.Link("GetUserWithId", new { id = post.Id })!), post);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize("Bearer")]
        [HttpPut]
        [Route("{id}", Name = "putUserWithId")]
        public async Task<ActionResult> Put(int id, [FromBody] UserDtoUpdate dtoUpdate)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var user = await Service.Get(id);
                if (user == null)
                    return NotFound("Usuário não encontrado.");

                if (IsPasswordChanged(dtoUpdate))
                {
                    if (IsPasswordCorrect(dtoUpdate, user))
                        return BadRequest("Senha antiga incorreta.");

                    user.Password = SetNewPassword(dtoUpdate);

                }

                var update = await Service.Put(dtoUpdate);
                return update == null ? BadRequest("Atualização falhou.") : Ok(update);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        private static string SetNewPassword(UserDtoUpdate dtoUpdate)
        {
            return BCrypt.Net.BCrypt.HashPassword(dtoUpdate.NewPassword);
        }

        private static bool IsPasswordChanged(UserDtoUpdate dtoUpdate)
        {
            return !string.IsNullOrEmpty(dtoUpdate.NewPassword);
        }

        private static bool IsPasswordCorrect(UserDtoUpdate dtoUpdate, UserDto existingUser)
        {
            return !BCrypt.Net.BCrypt.Verify(dtoUpdate.Password, existingUser.Password);
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
