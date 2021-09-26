using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class editstorychapter : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "EndChapter",
                table: "StoryChapters",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndChapter",
                table: "StoryChapters");
        }
    }
}
