using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using backend.Models.DTO;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
  public class UsuarioRepository : IUsuariosRepository
  {
    private readonly DataContext context;
    public UsuarioRepository(DataContext context)
    {
      this.context = context;

    }
    public async Task AddUsuario(UsuarioNewDto usuarioNewDto)
    {
      byte[] passwordHash, passwordSalt;
      
      var usuario = new Usuario();
      usuario.Email = usuarioNewDto.Email;
      usuario.Nome = usuarioNewDto.Nome;

      CreatePasswordHash(usuarioNewDto.Password, out passwordHash, out passwordSalt);
      usuario.PasswordHash = passwordHash;
      usuario.PasswordSalt = passwordSalt;
      await context.Usuarios.AddAsync(usuario);
    }

    public async Task<Usuario> GetUsuario(string email)
    {
      var usuario = await context.Usuarios.FirstOrDefaultAsync(x => x.Email == email && !x.Deleted);

      return usuario;
    }
    private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
        using (var hmac = new System.Security.Cryptography.HMACSHA512())
        {
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }

    }
  }
}