using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class UserStory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stories_AspNetUsers_AuthorId",
                table: "Stories");

            migrationBuilder.AlterColumn<int>(
                name: "AuthorId",
                table: "Stories",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "LikeStory",
                columns: table => new
                {
                    SourceUserId = table.Column<int>(type: "INTEGER", nullable: false),
                    LikedStoryId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LikeStory", x => new { x.SourceUserId, x.LikedStoryId });
                    table.ForeignKey(
                        name: "FK_LikeStory_AspNetUsers_SourceUserId",
                        column: x => x.SourceUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LikeStory_Stories_LikedStoryId",
                        column: x => x.LikedStoryId,
                        principalTable: "Stories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LikeStory_LikedStoryId",
                table: "LikeStory",
                column: "LikedStoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Stories_AspNetUsers_AuthorId",
                table: "Stories",
                column: "AuthorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stories_AspNetUsers_AuthorId",
                table: "Stories");

            migrationBuilder.DropTable(
                name: "LikeStory");

            migrationBuilder.AlterColumn<int>(
                name: "AuthorId",
                table: "Stories",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_Stories_AspNetUsers_AuthorId",
                table: "Stories",
                column: "AuthorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
