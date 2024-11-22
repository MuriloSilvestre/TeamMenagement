using System;
using System.Net;
using System.Threading.Tasks;
using Domain.Interfaces.Services.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController(IHomeService service) : ControllerBase
    {
        public IHomeService Service { get; set; } = service;

        [HttpGet]
        [Authorize("Bearer")]
        [Route("")]
        public async Task<ActionResult> GetDashboard()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var dashboard = await Service.GetDashboard();
                return dashboard == null ? NotFound() : Ok(dashboard);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }

        }

    }
}
