using System;
using System.Net;
using System.Threading.Tasks;
using Domain.Dtos.Team;
using Domain.Interfaces.Services.Team;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController(ITeamService service) : ControllerBase
    {
        public ITeamService Service { get; set; } = service;

        [HttpGet]
        [Route("")]
        public async Task<ActionResult> Get()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var teams = await Service.GetAll();
                return teams == null ? NotFound() : Ok(teams);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }

        }

        [HttpGet]
        [Authorize("Bearer")]
        [Route("project/{projectId}")]
        public async Task<ActionResult> GetByProject(int projectId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var team = await Service.GetByProject(projectId);
                return team == null
                    ? NotFound(new { message = "Nenhuma Equipe encontrado para o usuário." })
                    : Ok(team);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpGet]
        [Authorize("Bearer")]
        [Route("user/{userId}")]
        public async Task<ActionResult> GetByUser(int userId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var team = await Service.GetByUser(userId);
                return team == null
                    ? NotFound(new { message = "Nenhuma Equipe encontrado para o usuário." })
                    : Ok(team);
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
                var team = await Service.GetByContent(content);
                return team == null ? NotFound(new { message = "Nenhuma Equipe encontrado com esse nome." }) : Ok(team);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpGet]
        [Route("{id}", Name = "GetTeamWithId")]
        public async Task<ActionResult> Get(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var team = await Service.Get(id);
                return team == null ? NotFound() : Ok(team);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }

        }


        [Authorize("Bearer")]
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TeamDtoCreate dtoCreate)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var post = await Service.Post(dtoCreate);
                return post == null
                    ? BadRequest()
                    : Created(new Uri(Url.Link("GetTeamWithId", new { id = post.Id })!), post);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize("Bearer")]
        [HttpPut]
        [Route("{id}", Name = "putTeamWithId")]
        public async Task<ActionResult> Put(int id, [FromBody] TeamDtoUpdate dtoUpdate)
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
