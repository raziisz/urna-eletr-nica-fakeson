using System.Threading.Tasks;
using backend.Models.DTO;
using backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
  [ApiController]
  [Route("api/v1/[controller]")]
  [Authorize]
  public class CandidateController : ControllerBase
  {
    private readonly IUnityOfWork uof;
    private readonly ICandidatoRepository repo;
    public CandidateController(ICandidatoRepository repo, IUnityOfWork uof)
    {
      this.repo = repo;
      this.uof = uof;
    }

    [HttpPost("PostCandidate")]
    public async Task<IActionResult> Store(CandidatoNewDto candidatoNewDto)
    {
        await repo.AddCandidato(candidatoNewDto);

        if (await uof.Commit()) 
            return Ok(new { message = "Candidato salvo com sucesso."});
        
        return StatusCode(500, new { message = "Ocorreu um erro interno no servidor!"});
    }
  }
}