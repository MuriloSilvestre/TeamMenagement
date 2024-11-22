using System;
using System.Net;
using System.Threading.Tasks;
using Domain.Dtos.ProjectStatus;
using Domain.Interfaces.Services.ProjectStatus;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectStatusController(IProjectStatusService service) : ControllerBase
    {
        public IProjectStatusService Service { get; set; } = service;

        [HttpGet]
        [Route("project/{projectId}")]
        public async Task<ActionResult> GetByProject(int projectId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var projectStatus = await Service.GetByProject(projectId);
                return projectStatus == null ? NotFound() : Ok(projectStatus);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }

        }

        [HttpGet]
        [Route("{id}", Name = "GetProjectStatusWithId")]
        public async Task<ActionResult> Get(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var projectStatus = await Service.Get(id);
                return projectStatus == null ? NotFound() : Ok(projectStatus);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }

        }


        [Authorize("Bearer")]
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ProjectStatusDtoCreate dtoCreate)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var post = await Service.Post(dtoCreate);
                return post == null
                    ? BadRequest()
                    : Created(new Uri(Url.Link("GetProjectStatusWithId", new { id = post.Id })!), post);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize("Bearer")]
        [HttpPut]
        [Route("{id}", Name = "putProjectStatusWithId")]
        public async Task<ActionResult> Put(int id, [FromBody] ProjectStatusDtoUpdate dtoUpdate)
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
