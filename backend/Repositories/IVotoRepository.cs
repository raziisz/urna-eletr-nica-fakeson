using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Helpers;
using backend.Models;

namespace backend.Repositories
{
    public interface IVotoRepository
    {
        Task AddVoto(Voto voto);
        Task<PagedList<Candidato>> GetVotos(VotesParams vp);
        Task<int> GetCountVotosNulos();
    }
}