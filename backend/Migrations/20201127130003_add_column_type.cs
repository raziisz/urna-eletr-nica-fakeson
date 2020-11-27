using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class add_column_type : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<short>(
                name: "type",
                table: "votos",
                type: "smallint",
                nullable: false,
                defaultValue: (short)0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "type",
                table: "votos");
        }
    }
}
