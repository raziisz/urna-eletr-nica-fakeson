using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Repositories
{
    public interface ICandidatoRepository
    {
        Task AddCandidato(Candidato candidato);
        Task DeleteCandidato(int id);
        Task<Candidato> GetCandidato(string digito);
        Task<ICollection<Candidato>> GetCandidatos();
    }
}