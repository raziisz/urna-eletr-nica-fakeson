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

    public async Task<PagedList<Candidato>> GetVotos(VotesParams vp)
    {
      var query = context.Candidatos
          .Where(x => !x.Deleted)
          .OrderByDescending(x => x.NomeCompleto)
          .AsNoTracking()
          .AsQueryable();

      if (vp.Type == 1) {
        query = query.Where(x => x.TipoCandidato == 1);
      } else if (vp.Type == 2) {
        query = query.Where(x => x.TipoCandidato == 2);
      } 

      return await PagedList<Candidato>.CreateAsync(query, vp.PageNumber, vp.PageSize);
    }

    public async  Task<int> GetCountVotosNulos()
    {
      var votesNull = await context.Votos.Where(x => !x.Deleted && x.IdCandidato == null).ToListAsync();
      return votesNull.Count;
    }
  }
}