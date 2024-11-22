using System;
using System.Net;
using System.Threading.Tasks;
using Domain.Dtos.TeamProject;
using Domain.Interfaces.Services.TeamProject;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamProjectController(ITeamProjectService service) : ControllerBase
    {
        public ITeamProjectService Service { get; set; } = service;

        [HttpGet]
        [Route("team/{teamId}")]
        public async Task<ActionResult> GetByTeam(int teamId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var teamsTProjects = await Service.GetByTeam(teamId);
                return teamsTProjects == null ? NotFound() : Ok(teamsTProjects);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }

        }

        [HttpGet]
        [Route("project/{projectId}")]
        public async Task<ActionResult> GetByProject(int projectId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var teamsProjects = await Service.GetByProject(projectId);
                return teamsProjects == null ? NotFound() : Ok(teamsProjects);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }

        }

        [HttpGet]
        [Route("{id}", Name = "GetTeamProjectWithId")]
        public async Task<ActionResult> Get(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var teamProject = await Service.Get(id);
                return teamProject == null ? NotFound() : Ok(teamProject);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }

        }


        [Authorize("Bearer")]
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TeamProjectDtoCreate dtoCreate)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var post = await Service.Post(dtoCreate);
                return post == null
                    ? BadRequest()
                    : Created(new Uri(Url.Link("GetTeamProjectWithId", new { id = post.Id })!), post);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize("Bearer")]
        [HttpPut]
        [Route("{id}", Name = "putTeamProjectWithId")]
        public async Task<ActionResult> Put(int id, [FromBody] TeamProjectDtoUpdate dtoUpdate)
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
