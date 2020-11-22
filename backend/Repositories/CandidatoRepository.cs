using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using backend.Models.DTO;
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
    public async Task AddCandidato(CandidatoNewDto candidatoNewDto)
    {
      var candidato = new Candidato();
      candidato.Digito = candidatoNewDto.Digito;
      candidato.Legenda = candidatoNewDto.Legenda;
      candidato.NomeCompleto = candidatoNewDto.NomeCompleto;
      candidato.NomeVice = candidatoNewDto.NomeVice;
      candidato.TipoCandidato = candidatoNewDto.TipoCandidato;
      
      await context.Candidatos.AddAsync(candidato);
    }

    public async Task DeleteCandidato(int id)
    {
      var candidato = await context.Candidatos.FirstOrDefaultAsync(x => !x.Deleted && x.Id == id);

      candidato.Deleted = true;
    }

    public async Task<Candidato> GetCandidatoByDigito(string digito)
    {
      var candidato = await context.Candidatos.FirstOrDefaultAsync(x => !x.Deleted && x.Digito == digito);
      return candidato;
    }

    public async Task<Candidato> GetCandidatoById(int id)
    {
      var candidato = await context.Candidatos.Include(x => x.VotosRecebidos).FirstOrDefaultAsync(x => !x.Deleted && x.Id == id);
      return candidato;
    }

    public async Task<ICollection<Candidato>> GetCandidatos()
    {
       var candidatos = await context.Candidatos.AsNoTracking().Where(x => !x.Deleted).ToListAsync();

      return candidatos;
    }

    public async Task UpdateCandidato(int id, CandidatoNewDto updateCandidato)
    {
      var candidato = await context.Candidatos.FirstOrDefaultAsync(x => !x.Deleted && x.Id == id);
      candidato.Digito = updateCandidato.Digito;
      candidato.Legenda = updateCandidato.Legenda;
      candidato.NomeCompleto = updateCandidato.NomeCompleto;
      candidato.NomeVice = updateCandidato.NomeVice;
      candidato.TipoCandidato = updateCandidato.TipoCandidato;
    }
  }
}