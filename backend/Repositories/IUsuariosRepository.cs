using System.Threading.Tasks;
using backend.Models;
using backend.Models.DTO;

namespace backend.Repositories
{
    public interface IUsuariosRepository
    {
        Task AddUsuario(UsuarioNewDto usuarioNewDto);
        Task<Usuario> GetUsuario(string email);
    }
}