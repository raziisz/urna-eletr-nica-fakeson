using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Helpers;
using backend.Models;
using backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
  [ApiController]
  [Route("api/v1/[controller]")]
  [AllowAnonymous]
  public class VoteController : ControllerBase
  {
    private readonly IVotoRepository repo;
    private readonly IUnityOfWork uof;
    private readonly IHttpContextAccessor accessor;
    public VoteController(IVotoRepository repo, IUnityOfWork uof, IHttpContextAccessor accessor)
    {
      this.accessor = accessor;
      this.uof = uof;
      this.repo = repo;
    }


    [HttpPost("PostVote")]
    public async Task<IActionResult> Store([FromBody] Voto voto)
    {
      var dateActual = DateTime.Now;
      var ip = accessor.HttpContext.Connection.RemoteIpAddress.ToString();
      string ipReplace = ip.Replace("::ffff:", "");

      var codigoCidadao = $"{dateActual.ToString("yyyyMMdd")}{ipReplace.Trim()}";
      
      voto.CodigoVotacaoCidadao = Utils.CreateMD5(codigoCidadao);
      voto.DataVotacao = dateActual;

      await repo.AddVoto(voto);

      if (await uof.Commit()) return StatusCode(201, new { message = "Voto computado com sucesso" });

      throw new Exception("Ocorreu um erro interno no servidor");
    }

    [HttpGet("GetVotos")]
    public async Task<IActionResult> Index([FromQuery] VotesParams vp)
    {
      ICollection<Candidato> votes = new List<Candidato>();
      ICollection<Voto> nulls = new List<Voto>();
      ICollection<Voto> brancos = new List<Voto>();
      
      if (vp.Type < 3) {
        votes = await repo.GetVotos(vp);
        nulls = await repo.GetCountVotosNulos();
        brancos = await repo.GetCountVotosBrancos();

      } else if (vp.Type == 3) {
        nulls = await repo.GetCountVotosNulos();
        brancos = await repo.GetCountVotosBrancos();

      }


      return Ok(new {
          votes,
          nulls,
          brancos
      });
    }


  }
}