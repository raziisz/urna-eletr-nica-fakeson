using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using backend.Models.DTO;

namespace backend.Repositories
{
    public interface ICandidatoRepository
    {
        Task AddCandidato(CandidatoNewDto candidatoNewDto);
        Task DeleteCandidato(int id);
        Task<Candidato> GetCandidato(string digito);
        Task<ICollection<Candidato>> GetCandidatos();
    }
}