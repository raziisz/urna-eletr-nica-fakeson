using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Helpers;
using backend.Models;
using backend.Models.DTO;

namespace backend.Repositories
{
    public interface ICandidatoRepository
    {
        Task AddCandidato(CandidatoNewDto candidatoNewDto);
        Task UpdateCandidato(int id, CandidatoNewDto updateCandidato);
        Task DeleteCandidato(int id);
        Task<Candidato> GetCandidatoByDigito(string digito);
        Task<Candidato> GetCandidatoById(int id);
        Task<PagedList<Candidato>> GetCandidatos(CandidatesParams cp);
    }
}