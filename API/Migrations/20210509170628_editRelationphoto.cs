using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class editRelationphoto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PhotoStories_StoryId",
                table: "PhotoStories");

            migrationBuilder.CreateIndex(
                name: "IX_PhotoStories_StoryId",
                table: "PhotoStories",
                column: "StoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PhotoStories_StoryId",
                table: "PhotoStories");

            migrationBuilder.CreateIndex(
                name: "IX_PhotoStories_StoryId",
                table: "PhotoStories",
                column: "StoryId",
                unique: true);
        }
    }
}
