using System;
using System.Linq;
using System.Threading.Tasks;
using backend.Helpers;
using backend.Models.DTO;
using backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
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
    private readonly IWebHostEnvironment environment;
    public CandidateController(ICandidatoRepository repo, IUnityOfWork uof, IWebHostEnvironment environment)
    {
      this.environment = environment;
      this.repo = repo;
      this.uof = uof;
    }

    [HttpGet]
    public async Task<IActionResult> Index([FromQuery] CandidatesParams cp)
    {
      var result = await repo.GetCandidatos(cp);
      var webRootPath = environment.WebRootPath;

      Response.AddPagination(result.CurrentPage, result.PageSize, result.TotalCount, result.TotalPages);

      var candidatos = result.Select(x => new CandidatoDto
      {
        Id = x.Id,
        Digito = x.Digito,
        DataRegistro = x.DataRegistro,
        Legenda = x.Legenda,
        NomeCompleto = x.NomeCompleto,
        NomeVice = x.NomeVice != null ? x.NomeVice : "",
        TipoCandidato = x.TipoCandidato,
        FotoCandidato = Utils.SearchFile($"{x.Digito}_{x.NomeCompleto.Replace(" ", "")}", webRootPath),
        FotoVice = x.NomeVice != null ? Utils.SearchFile($"{x.Digito}_{x.NomeVice.Replace(" ", "")}", webRootPath) : "",
      }).ToArray();
      
      return Ok(new { candidatos });
    }
    [AllowAnonymous]
    [HttpGet("/byDigit/{digito}")]
    public async Task<IActionResult> GetCandidate(string digito)
    {
      var result = await repo.GetCandidatoByDigito(digito);
      var webRootPath = environment.WebRootPath;

      if (result == null) return NotFound(new { message = "Candidato não encontrado!" });

      var candidato = new CandidatoDto
      {
        Id = result.Id,
        Digito = result.Digito,
        DataRegistro = result.DataRegistro,
        Legenda = result.Legenda,
        NomeCompleto = result.NomeCompleto,
        NomeVice = result.NomeVice != null ?result.NomeVice : "",
        TipoCandidato = result.TipoCandidato,
        FotoCandidato = Utils.SearchFile($"{result.Digito}_{result.NomeCompleto.Replace(" ", "")}", webRootPath),
        FotoVice = result.NomeVice != null ? Utils.SearchFile($"{result.Digito}_{result.NomeVice.Replace(" ", "")}", webRootPath) : "",
      };

      return Ok(new { candidato });
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> Show(int id)
    {
      var candidate = await repo.GetCandidatoById(id);
      var webRootPath = environment.WebRootPath;
      

      if (candidate == null) return NotFound(new { message = "Candidato não encontrado!" });

      var candidato = new CandidatoDto
      {
        Id = candidate.Id,
        Digito = candidate.Digito,
        DataRegistro = candidate.DataRegistro,
        Legenda = candidate.Legenda,
        NomeCompleto = candidate.NomeCompleto,
        NomeVice = candidate.NomeVice != null ?candidate.NomeVice : "",
        TipoCandidato = candidate.TipoCandidato,
        FotoCandidato = Utils.SearchFile($"{candidate.Digito}_{candidate.NomeCompleto.Replace(" ", "")}", webRootPath),
        FotoVice = candidate.NomeVice != null ? Utils.SearchFile($"{candidate.Digito}_{candidate.NomeVice.Replace(" ", "")}", webRootPath) : "",
      };


      return Ok(new { candidato });
    }

    [HttpPost("PostCandidate")]
    public async Task<IActionResult> Store([FromForm] CandidatoNewDto candidatoNewDto)
    {
      var candidate = await repo.GetCandidatoByDigito(candidatoNewDto.Digito);

      if (candidate != null) return BadRequest(new { message = "Já existe um candidato com este dígito!" });

      await repo.AddCandidato(candidatoNewDto);

      if (await uof.Commit())
      {
        var webRootPath = environment.WebRootPath;
        var filenameCandidate = $"{candidatoNewDto.Digito}_{candidatoNewDto.NomeCompleto.Replace(" ", "")}";
        
        if (candidatoNewDto.TipoCandidato == 1) {
          var filenameVice = $"{candidatoNewDto.Digito}_{candidatoNewDto.NomeVice.Replace(" ", "")}";
          await Utils.SaveFile(candidatoNewDto.FotoVice, filenameVice, webRootPath);

        }
        
        await Utils.SaveFile(candidatoNewDto.FotoCandidato, filenameCandidate, webRootPath);
        
        return Ok(new { message = "Candidato salvo com sucesso." });
      }

      return StatusCode(500, new { message = "Ocorreu um erro interno no servidor!" });
    }

    [HttpDelete("DeleteCandidate/{id}")]
    public async Task<IActionResult> Destroy(int id)
    {
      var candidate = await repo.GetCandidatoById(id);

      if (candidate == null) return NotFound(new { message = "Candidato não encontrado!" });

      await repo.DeleteCandidato(id);

      if (await uof.Commit()) return NoContent();

      throw new Exception("Ocorreu um erro interno");
    }

    [HttpPut("EditCandidate/{id}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] CandidatoNewDto candidatoUpdate)
    {
      var candidate = await repo.GetCandidatoById(id);

      if (candidate == null) return NotFound(new { message = "Candidato não encontrado!" });
      if (candidate.VotosRecebidos.Count > 0) return BadRequest(new { message = "Este candidato já possui votos associados, não é possível alterar seus dados!" });

      await repo.UpdateCandidato(id, candidatoUpdate);

      if (await uof.Commit()) return NoContent();

      throw new Exception("Ocorreu um erro interno");

    }
  }
}