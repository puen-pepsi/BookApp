using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class storyphoto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileName",
                table: "PhotoStories");

            migrationBuilder.AddColumn<bool>(
                name: "IsMain",
                table: "PhotoStories",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "PublicId",
                table: "PhotoStories",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "PhotoStories",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsMain",
                table: "PhotoStories");

            migrationBuilder.DropColumn(
                name: "PublicId",
                table: "PhotoStories");

            migrationBuilder.DropColumn(
                name: "Url",
                table: "PhotoStories");

            migrationBuilder.AddColumn<string>(
                name: "FileName",
                table: "PhotoStories",
                type: "TEXT",
                maxLength: 255,
                nullable: false,
                defaultValue: "");
        }
    }
}
