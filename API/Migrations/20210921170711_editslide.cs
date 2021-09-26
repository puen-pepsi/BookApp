using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class editslide : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "GotoUrl",
                table: "PhotoSlides",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GotoUrl",
                table: "PhotoSlides");
        }
    }
}
