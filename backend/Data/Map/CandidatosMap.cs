using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Data.Map
{
  public class CandidatosMap : IEntityTypeConfiguration<Candidato>
  {
    public void Configure(EntityTypeBuilder<Candidato> builder)
    {
      builder.ToTable("candidatos");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .HasColumnName("id");

            builder.Property(x => x.Digito)
                .HasColumnName("digito")
                .HasColumnType("varchar(5)")
                .IsRequired();
            
            builder.HasIndex(x => x.Digito).IsUnique();

            builder.Property(x => x.Legenda)
                .HasColumnName("legenda")
                .HasColumnType("varchar(500)");

            builder.Property(x => x.NomeCompleto)
                .HasColumnName("nome_completo")
                .HasColumnType("varchar(250)")
                .IsRequired();
            
            builder.Property(x => x.DataRegistro)
                .HasColumnName("data_registro")
                .HasColumnType("datetime")
                .HasDefaultValueSql("NOW()");

            builder.Property(x => x.NomeVice)
                .HasColumnName("nome_vice")
                .HasColumnType("varchar(250)");
            
            builder.Property(x => x.TipoCandidato)
                .HasColumnName("tipo_candidato")
                .HasColumnType("smallint")
                .IsRequired();

            builder.Property(x => x.Deleted)
                .HasColumnName("deleted")
                .HasColumnType("tinyint")
                .HasDefaultValue(0);
    }
  }
}