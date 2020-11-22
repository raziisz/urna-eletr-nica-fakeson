using System.Threading.Tasks;
using backend.Models.DTO;
using backend.Repositories;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace backend.Controllers
{
  [ApiController]
  [Route("api/v1/[controller]")]
  [AllowAnonymous]
  public class AuthController : ControllerBase
  {
    private readonly IAuthRepository repo;
    private readonly IConfiguration config;
    public AuthController(IAuthRepository repo, IConfiguration config)
    {
      this.config = config;
      this.repo = repo;
    }

    [HttpPost]
    public async Task<IActionResult> Login([FromBody] Login login)
    {
        var user = await repo.Login(login.Email, login.Password);

        if (user == null) return BadRequest(new { message = "Email ou senha inválida"});

        var token = TokenService.GenerateTokenUser(user, config);

        return Ok(new { token, user});
    }
  }
}