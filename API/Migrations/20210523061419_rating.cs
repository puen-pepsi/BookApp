using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class rating : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Rating",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Rated = table.Column<int>(type: "INTEGER", nullable: false),
                    StoryRatedId = table.Column<int>(type: "INTEGER", nullable: false),
                    UserRatedId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rating", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rating_AspNetUsers_UserRatedId",
                        column: x => x.UserRatedId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Rating_Stories_StoryRatedId",
                        column: x => x.StoryRatedId,
                        principalTable: "Stories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rating_StoryRatedId",
                table: "Rating",
                column: "StoryRatedId");

            migrationBuilder.CreateIndex(
                name: "IX_Rating_UserRatedId",
                table: "Rating",
                column: "UserRatedId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Rating");
        }
    }
}
