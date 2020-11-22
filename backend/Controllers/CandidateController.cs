using System;
using System.Linq;
using System.Threading.Tasks;
using backend.Helpers;
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

    [HttpGet]
    public async Task<IActionResult> Index(CandidatesParams cp)
    {
      var result = await repo.GetCandidatos(cp);

      Response.AddPagination(result.CurrentPage, result.PageSize, result.TotalCount, result.TotalPages);

      var candidatos = result.Select(x => new CandidatoList
      {
        Id = x.Id,
        Digito = x.Digito,
        DataRegistro = x.DataRegistro,
        Legenda = x.Legenda,
        NomeCompleto = x.NomeCompleto,
        NomeVice = x.NomeVice,
        TipoCandidato = x.TipoCandidato
      }).ToArray();
      return Ok(new { candidatos });
    }
    [AllowAnonymous]
    [HttpGet("{digito}")]
    public async Task<IActionResult> Show(string digito)
    {
      var candidate = await repo.GetCandidatoByDigito(digito);

      if (candidate == null) return NotFound(new { message = "Candidato não encontrado!"});

      return Ok(new { candidate });
    }

    [HttpPost("PostCandidate")]
    public async Task<IActionResult> Store(CandidatoNewDto candidatoNewDto)
    {
        await repo.AddCandidato(candidatoNewDto);

        if (await uof.Commit()) 
            return Ok(new { message = "Candidato salvo com sucesso."});
        
        return StatusCode(500, new { message = "Ocorreu um erro interno no servidor!"});
    }

    [HttpDelete("DeleteCandidate/{id}")]
    public async Task<IActionResult> Destroy(int id)
    {
      var candidate = await repo.GetCandidatoById(id);

      if (candidate == null) return NotFound(new { message = "Candidato não encontrado!"});

      await repo.DeleteCandidato(id);

      if (await uof.Commit()) return NoContent();

      throw new Exception("Ocorreu um erro interno");
    }

    [HttpPut("EditCandidate/{id}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] CandidatoNewDto candidatoUpdate)
    {
      var candidate = await repo.GetCandidatoById(id);

      if (candidate == null) return NotFound(new { message = "Candidato não encontrado!"});
      if (candidate.VotosRecebidos.Count > 0) return BadRequest(new { message = "Este candidato já possui votos associados, não é possível alterar seus dados!"});

      await repo.UpdateCandidato(id, candidatoUpdate);

      if (await uof.Commit()) return NoContent();

      throw new Exception("Ocorreu um erro interno");

    }
  }
}