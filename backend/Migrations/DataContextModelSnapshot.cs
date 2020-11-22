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
                        .HasColumnType("int");

                    b.Property<DateTime>("DataRegistro")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Deleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Digito")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Legenda")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("NomeCompleto")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("NomeVice")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<short>("TipoCandidato")
                        .HasColumnType("smallint");

                    b.HasKey("Id");

                    b.ToTable("Candidatos");
                });

            modelBuilder.Entity("backend.Models.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Deleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Email")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Nome")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("longblob");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("longblob");

                    b.Property<DateTime>("UpdateAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("Usuarios");
                });

            modelBuilder.Entity("backend.Models.Voto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("CandidatoId")
                        .HasColumnType("int");

                    b.Property<string>("CodigoVotacaoCidadao")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTime>("DataVotacao")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Deleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<int?>("IdCandidato")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CandidatoId");

                    b.ToTable("Votos");
                });

            modelBuilder.Entity("backend.Models.Voto", b =>
                {
                    b.HasOne("backend.Models.Candidato", "Candidato")
                        .WithMany("VotosRecebidos")
                        .HasForeignKey("CandidatoId");
                });
#pragma warning restore 612, 618
        }
    }
}
