using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Domain.Dtos.Project;
using Domain.Interfaces.Services.Project;
using Domain.Interfaces.Services.Team;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController(IProjectService service, ITeamService teamService) : ControllerBase
    {
        public IProjectService Service { get; set; } = service;
        private ITeamService TeamService { get; set; } = teamService;

        [HttpGet]
        [Route("")]
        public async Task<ActionResult> Get()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState); 

            try
            {
                var projects = await Service.GetAll();
                return projects == null ? NotFound() : Ok(projects);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }

        }

        [HttpGet]
        [Authorize("Bearer")]
        [Route("team/{TeamIds}")]
        public async Task<ActionResult> GetProjectsByTeam(string teamIds)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                if (!TeamService.GetTeamIdList(teamIds).Any())
                    return BadRequest(new { message = "Nenhum Team ID válido fornecido." });

                var projectsByTeam = await Service.GetProjectsByTeam(TeamService.GetTeamIdList(teamIds));
                return projectsByTeam == null
                    ? NotFound(new { message = "Nenhum Projeto encontrado para o usuário." })
                    : Ok(projectsByTeam);
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
                var projectsByContent = await Service.GetByContent(content);
                return projectsByContent == null
                    ? NotFound(new { message = "Nenhum Projeto encontrado com esse nome." })
                    : Ok(projectsByContent);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpGet]
        [Route("{id}", Name = "GetProjectWithId")]
        public async Task<ActionResult> Get(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var project = await Service.Get(id);
                return project == null ? NotFound() : Ok(project);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }

        }


        [Authorize("Bearer")]
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ProjectDtoCreate dtoCreate)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var post = await Service.Post(dtoCreate);
                return post == null
                    ? BadRequest()
                    : Created(new Uri(Url.Link("GetProjectWithId", new { id = post.Id })!), post);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize("Bearer")]
        [HttpPut]
        [Route("{id}", Name = "putProjectWithId")]
        public async Task<ActionResult> Put(int id, [FromBody] ProjectDtoUpdate dtoUpdate)
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
