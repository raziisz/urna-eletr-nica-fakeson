using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Data.Map
{
  public class VotosMap : IEntityTypeConfiguration<Voto>
  {
    public void Configure(EntityTypeBuilder<Voto> builder)
    {
      builder.ToTable("votos");

      builder.HasKey(x => x.Id);

      builder.Property(x => x.Id)
          .HasColumnName("id");

      builder.Property(x => x.CodigoVotacaoCidadao)
          .HasColumnName("codigo_votacao_cidadao")
          .HasColumnType("varchar(250)")
          .IsRequired();

       builder.Property(x => x.Type)
                .HasColumnName("type")
                .HasColumnType("smallint")
                .IsRequired();

      builder.Property(x => x.DataVotacao)
          .HasColumnName("data_votacao")
          .HasColumnType("datetime");

      builder.Property(x => x.CandidatoId)
          .HasColumnName("candidato_id");

      builder.Property(x => x.Deleted)
          .HasColumnName("deleted")
          .HasColumnType("tinyint")
          .HasDefaultValue(0);

      builder
        .HasOne(x => x.Candidato)
        .WithMany(x => x.VotosRecebidos)
        .OnDelete(DeleteBehavior.SetNull);

    }
  }
}