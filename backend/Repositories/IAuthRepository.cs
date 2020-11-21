using System.Threading.Tasks;
using backend.Models.DTO;

namespace backend.Repositories
{
    public interface IAuthRepository
    {
        Task<UsuarioReturnDto> Login(string email, string password);
    }
}