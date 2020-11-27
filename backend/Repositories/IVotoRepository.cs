using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Helpers;
using backend.Models;

namespace backend.Repositories
{
    public interface IVotoRepository
    {
        Task AddVoto(Voto voto);
        Task<ICollection<Candidato>> GetVotos(VotesParams vp);
        Task<ICollection<Voto>> GetCountVotosNulos();
        Task<ICollection<Voto>> GetCountVotosBrancos();
    }
}