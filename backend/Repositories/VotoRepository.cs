using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
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

    public async Task<ICollection<Voto>> GetVotos()
    {
      var votos = await context.Votos.AsNoTracking().Where(x => !x.Deleted).ToListAsync();
      return votos;
    }
  }
}