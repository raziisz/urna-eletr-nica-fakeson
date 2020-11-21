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
    }
}