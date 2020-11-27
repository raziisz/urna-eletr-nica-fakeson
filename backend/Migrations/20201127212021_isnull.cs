using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class isnull : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "candidatos",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    digito = table.Column<string>(type: "varchar(5)", nullable: false),
                    nome_completo = table.Column<string>(type: "varchar(250)", nullable: false),
                    nome_vice = table.Column<string>(type: "varchar(250)", nullable: true),
                    data_registro = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "NOW()"),
                    legenda = table.Column<string>(type: "varchar(500)", nullable: true),
                    tipo_candidato = table.Column<short>(type: "smallint", nullable: false),
                    deleted = table.Column<sbyte>(type: "tinyint", nullable: false, defaultValue: (sbyte)0)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_candidatos", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "usuarios",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    nome = table.Column<string>(type: "varchar(500)", nullable: true),
                    email = table.Column<string>(type: "varchar(250)", nullable: false),
                    password_salt = table.Column<byte[]>(type: "MEDIUMBLOB", nullable: true),
                    password_hash = table.Column<byte[]>(type: "MEDIUMBLOB", nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime", nullable: false),
                    update_at = table.Column<DateTime>(type: "datetime", nullable: false),
                    deleted = table.Column<sbyte>(type: "tinyint", nullable: false, defaultValue: (sbyte)0)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usuarios", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "votos",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    data_votacao = table.Column<DateTime>(type: "datetime", nullable: false),
                    codigo_votacao_cidadao = table.Column<string>(type: "varchar(250)", nullable: false),
                    type = table.Column<short>(type: "smallint", nullable: false),
                    is_nulo = table.Column<sbyte>(type: "tinyint", nullable: false, defaultValue: (sbyte)0),
                    candidato_id = table.Column<int>(nullable: true),
                    deleted = table.Column<sbyte>(type: "tinyint", nullable: false, defaultValue: (sbyte)0)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_votos", x => x.id);
                    table.ForeignKey(
                        name: "FK_votos_candidatos_candidato_id",
                        column: x => x.candidato_id,
                        principalTable: "candidatos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "IX_candidatos_digito",
                table: "candidatos",
                column: "digito",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_votos_candidato_id",
                table: "votos",
                column: "candidato_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "usuarios");

            migrationBuilder.DropTable(
                name: "votos");

            migrationBuilder.DropTable(
                name: "candidatos");
        }
    }
}
