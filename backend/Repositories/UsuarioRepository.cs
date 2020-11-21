using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
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
    public async Task AddUsuario(Usuario usuario)
    {
      await context.Usuarios.AddAsync(usuario);
    }

    public async Task<Usuario> GetUsuario(string email)
    {
      var usuario = await context.Usuarios.FirstOrDefaultAsync(x => x.Email == email);

      return usuario;
    }
  }
}