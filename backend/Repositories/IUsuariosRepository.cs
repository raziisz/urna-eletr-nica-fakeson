using System.Threading.Tasks;
using backend.Models;

namespace backend.Repositories
{
    public interface IUsuariosRepository
    {
        Task AddUsuario(Usuario usuario);
        Task<Usuario> GetUsuario(string email);
    }
}