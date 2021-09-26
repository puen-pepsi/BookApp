using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class TagStory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stories_Tags_TagId",
                table: "Stories");

            migrationBuilder.DropIndex(
                name: "IX_Stories_TagId",
                table: "Stories");

            migrationBuilder.DropColumn(
                name: "TagId",
                table: "Stories");

            migrationBuilder.CreateTable(
                name: "TagStories",
                columns: table => new
                {
                    TagId = table.Column<int>(type: "INTEGER", nullable: false),
                    StoryId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TagStories", x => new { x.TagId, x.StoryId });
                    table.ForeignKey(
                        name: "FK_TagStories_Stories_StoryId",
                        column: x => x.StoryId,
                        principalTable: "Stories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TagStories_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TagStories_StoryId",
                table: "TagStories",
                column: "StoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TagStories");

            migrationBuilder.AddColumn<int>(
                name: "TagId",
                table: "Stories",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Stories_TagId",
                table: "Stories",
                column: "TagId");

            migrationBuilder.AddForeignKey(
                name: "FK_Stories_Tags_TagId",
                table: "Stories",
                column: "TagId",
                principalTable: "Tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
