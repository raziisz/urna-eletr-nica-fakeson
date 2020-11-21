using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Repositories
{
    public interface IVotoRepository
    {
        Task AddVoto(Voto voto);
        Task<ICollection<Voto>> GetVotos();
    }
}