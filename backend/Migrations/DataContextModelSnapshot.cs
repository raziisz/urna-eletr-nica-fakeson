﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using backend.Data;

namespace backend.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("backend.Models.Candidato", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("int");

                    b.Property<DateTime>("DataRegistro")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("data_registro")
                        .HasColumnType("datetime")
                        .HasDefaultValueSql("NOW()");

                    b.Property<sbyte>("Deleted")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("deleted")
                        .HasColumnType("tinyint")
                        .HasDefaultValue((sbyte)0);

                    b.Property<string>("Digito")
                        .IsRequired()
                        .HasColumnName("digito")
                        .HasColumnType("varchar(5)");

                    b.Property<string>("Legenda")
                        .HasColumnName("legenda")
                        .HasColumnType("varchar(500)");

                    b.Property<string>("NomeCompleto")
                        .IsRequired()
                        .HasColumnName("nome_completo")
                        .HasColumnType("varchar(250)");

                    b.Property<string>("NomeVice")
                        .HasColumnName("nome_vice")
                        .HasColumnType("varchar(250)");

                    b.Property<short>("TipoCandidato")
                        .HasColumnName("tipo_candidato")
                        .HasColumnType("smallint");

                    b.HasKey("Id");

                    b.HasIndex("Digito")
                        .IsUnique();

                    b.ToTable("candidatos");
                });

            modelBuilder.Entity("backend.Models.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnName("created_at")
                        .HasColumnType("datetime");

                    b.Property<sbyte>("Deleted")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("deleted")
                        .HasColumnType("tinyint")
                        .HasDefaultValue((sbyte)0);

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnName("email")
                        .HasColumnType("varchar(250)");

                    b.Property<string>("Nome")
                        .HasColumnName("nome")
                        .HasColumnType("varchar(500)");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnName("password_hash")
                        .HasColumnType("MEDIUMBLOB");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnName("password_salt")
                        .HasColumnType("MEDIUMBLOB");

                    b.Property<DateTime>("UpdateAt")
                        .HasColumnName("update_at")
                        .HasColumnType("datetime");

                    b.HasKey("Id");

                    b.ToTable("usuarios");
                });

            modelBuilder.Entity("backend.Models.Voto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("int");

                    b.Property<int?>("CandidatoId")
                        .HasColumnName("candidato_id")
                        .HasColumnType("int");

                    b.Property<string>("CodigoVotacaoCidadao")
                        .IsRequired()
                        .HasColumnName("codigo_votacao_cidadao")
                        .HasColumnType("varchar(250)");

                    b.Property<DateTime>("DataVotacao")
                        .HasColumnName("data_votacao")
                        .HasColumnType("datetime");

                    b.Property<sbyte>("Deleted")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("deleted")
                        .HasColumnType("tinyint")
                        .HasDefaultValue((sbyte)0);

                    b.Property<sbyte>("IsNulo")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("is_nulo")
                        .HasColumnType("tinyint")
                        .HasDefaultValue((sbyte)0);

                    b.Property<short>("Type")
                        .HasColumnName("type")
                        .HasColumnType("smallint");

                    b.HasKey("Id");

                    b.HasIndex("CandidatoId");

                    b.ToTable("votos");
                });

            modelBuilder.Entity("backend.Models.Voto", b =>
                {
                    b.HasOne("backend.Models.Candidato", "Candidato")
                        .WithMany("VotosRecebidos")
                        .HasForeignKey("CandidatoId")
                        .OnDelete(DeleteBehavior.SetNull);
                });
#pragma warning restore 612, 618
        }
    }
}
