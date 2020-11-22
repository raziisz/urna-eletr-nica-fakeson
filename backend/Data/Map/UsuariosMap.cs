using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Data.Map
{
    public class UsuariosMap : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            builder.ToTable("usuarios");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .HasColumnName("id");

            builder.Property(x => x.Email)
                .HasColumnName("email")
                .HasColumnType("varchar(250)")
                .IsRequired()
                ;

            builder.Property(x => x.Nome)
                .HasColumnName("nome")
                .HasColumnType("varchar(500)");

            builder.Property(x => x.PasswordHash)
                .HasColumnName("password_hash")
                .HasColumnType("MEDIUMBLOB");

            builder.Property(x => x.PasswordSalt)
                .HasColumnName("password_salt")
                .HasColumnType("MEDIUMBLOB");
            
            builder.Property(x => x.UpdateAt)
                .HasColumnName("update_at")
                .HasColumnType("datetime");

            builder.Property(x => x.CreatedAt)
                .HasColumnName("created_at")
                .HasColumnType("datetime");

            builder.Property(x => x.Deleted)
                .HasColumnName("deleted")
                .HasColumnType("tinyint")
                .HasDefaultValue(0);

  
        }
    }
}