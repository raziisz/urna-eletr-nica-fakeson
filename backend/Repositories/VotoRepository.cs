using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Helpers;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
  public class VotoRepository : IVotoRepository
  {
    private readonly DataContext context;
    public VotoRepository(DataContext context)
    {
      this.context = context;

    }
    public async Task AddVoto(Voto voto)
    {
      await context.Votos.AddAsync(voto);
    }

    public async Task<ICollection<Candidato>> GetVotos(VotesParams vp)
    {
      var candidatos = context.Candidatos
          .Where(x => !x.Deleted)
          .Include(x => x.VotosRecebidos)
          .OrderByDescending(x => x.NomeCompleto)
          .AsNoTracking()
          .AsQueryable();

      if (vp.Type == 1) {
        candidatos = candidatos.Where(x => vp.Type == x.TipoCandidato);
      } else if (vp.Type == 2) {
        candidatos = candidatos.Where(x => vp.Type == x.TipoCandidato);
      }

      return await candidatos.ToListAsync();
    }

    public async  Task<ICollection<Voto>> GetCountVotosNulos()
    {
      var votesNull = await context.Votos.Where(x => !x.Deleted && x.IsNulo).ToListAsync();
      return votesNull;
    }

    public async Task<ICollection<Voto>> GetCountVotosBrancos()
    {
      var votesBrancos = await context.Votos.Where(x => !x.Deleted && x.CandidatoId == null && !x.IsNulo).ToListAsync();
      return votesBrancos;
    }
  }
}