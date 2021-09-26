using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class photoscreeedit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "PhotoScreens",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "PhotoScreens");
        }
    }
}
