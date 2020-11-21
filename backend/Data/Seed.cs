using System.Linq;
using backend.Models;
using backend.Models.DTO;
using Newtonsoft.Json;

namespace backend.Data
{
  public class Seed
  {
    private readonly DataContext context;
    public Seed(DataContext context)
    {
      this.context = context;
    }

    public void SeedUsuarioAdmin()
    {
        if(!context.Usuarios.Any()) {
            var userData = System.IO.File.ReadAllText("Data/UserAdminData.json");
            var userNew = JsonConvert.DeserializeObject<UsuarioNewDto>(userData);
            
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(userNew.Password, out passwordHash, out passwordSalt);

            var usuario = new Usuario();
            usuario.Email = userNew.Email;
            usuario.Nome = userNew.Nome;
            usuario.PasswordHash = passwordHash;
            usuario.PasswordSalt = passwordSalt;


            context.Usuarios.Add(usuario);
            

            context.SaveChanges();
        }
    }

    private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
        using(var hmac = new System.Security.Cryptography.HMACSHA512()){
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
        
    }
  }
}