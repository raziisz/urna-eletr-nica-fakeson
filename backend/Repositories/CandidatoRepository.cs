using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
  public class CandidatoRepository : ICandidatoRepository
  {
    private readonly DataContext context;
    public CandidatoRepository(DataContext context)
    {
      this.context = context;

    }
    public async Task AddCandidato(Candidato candidato)
    {
      await context.Candidatos.AddAsync(candidato);
    }

    public async Task DeleteCandidato(int id)
    {
      var candidato = await context.Candidatos.FirstOrDefaultAsync(x => !x.Deleted && x.Id == id);

      candidato.Deleted = true;
    }

    public async Task<Candidato> GetCandidato(string digito)
    {
      var candidato = await context.Candidatos.FirstOrDefaultAsync(x => !x.Deleted && x.Digito == digito);
      return candidato;
    }

    public async Task<ICollection<Candidato>> GetCandidatos()
    {
      var candidatos = await context.Candidatos.AsNoTracking().Where(x => !x.Deleted).ToListAsync();

      return candidatos;
    }
  }
}