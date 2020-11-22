using backend.Data.Map;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        { 
        }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Candidato> Candidatos { get; set; }
        public DbSet<Voto> Votos { get; set; }   

        protected override void OnModelCreating(ModelBuilder builder) {
           
            builder.ApplyConfiguration(new UsuariosMap());
            builder.ApplyConfiguration(new CandidatosMap());
            builder.ApplyConfiguration(new VotosMap());
        }
    }
}