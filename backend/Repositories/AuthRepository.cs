using System.Threading.Tasks;
using backend.Data;
using backend.Models.DTO;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
  public class AuthRepository : IAuthRepository
  {
    private readonly DataContext context;
    public AuthRepository(DataContext context)
    {
      this.context = context;

    }
    public async Task<UsuarioReturnDto> Login(string email, string password)
    {
      var usuario = await context.Usuarios.FirstOrDefaultAsync(x => !x.Deleted && x.Email == email);

      if (usuario == null) return null;

      if (!VerifyPasswordHash(password, usuario.PasswordHash, usuario.PasswordSalt)) return null;

      return new UsuarioReturnDto
      {
          Email = usuario.Email,
          Id = usuario.Id,
          Nome = usuario.Nome
      };
    }

    private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
    {
        using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt)){
            var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            for(int i = 0; i< computedHash.Length; i++){
                if(computedHash[i] != passwordHash[i]) return false;
            }
        }
        return true;
    }
  }
}