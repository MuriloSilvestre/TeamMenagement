using System;
using System.Net;
using System.Threading.Tasks;
using Domain.Dtos;
using Domain.Interfaces.Services.User;
using Microsoft.AspNetCore.Mvc;

namespace application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController(ILoginService service) : ControllerBase
    {
        public ILoginService Service { get; set; } = service;

        [HttpPost]
        public async Task<object> Login([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            if (loginDto == null)
                return BadRequest(new { message = "Dados de login inválidos." });

            try
            {
                var user = await Service.FindByLogin(loginDto);
                return user ?? NotFound(new { message = "Usuário ou senha inválidos." });
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }
    }
}