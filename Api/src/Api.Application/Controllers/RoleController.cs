using System;
using System.Net;
using System.Threading.Tasks;
using Domain.Dtos.Role;
using Domain.Interfaces.Services.Role;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController(IRoleService service) : ControllerBase
    {
        public IRoleService Service { get; set; } = service;

        [HttpGet]
        [Route("")]
        public async Task<ActionResult> Get()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var roles = await Service.GetAll();
                return roles == null ? NotFound() : Ok(roles);
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
                var roles = await Service.GetByContent(content);
                return roles == null
                    ? NotFound(new { message = "Nenhuma Função encontrado com esse nome." })
                    : Ok(roles);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpGet]
        [Route("{id}", Name = "GetRoleWithId")]
        public async Task<ActionResult> Get(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var role = await Service.Get(id);
                return role == null ? NotFound() : Ok(role);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }

        }


        [Authorize("Bearer")]
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] RoleDtoCreate dtoCreate)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var post = await Service.Post(dtoCreate);
                return post == null
                    ? BadRequest()
                    : Created(new Uri(Url.Link("GetRoleWithId", new { id = post.Id })!), post);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize("Bearer")]
        [HttpPut]
        [Route("{id}", Name = "putRoleWithId")]
        public async Task<ActionResult> Put(int id, [FromBody] RoleDtoUpdate dtoUpdate)
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
