using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class editstoryauthor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stories_AspNetUsers_AppUserId",
                table: "Stories");

            migrationBuilder.RenameColumn(
                name: "AppUserId",
                table: "Stories",
                newName: "AuthorId");

            migrationBuilder.RenameIndex(
                name: "IX_Stories_AppUserId",
                table: "Stories",
                newName: "IX_Stories_AuthorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Stories_AspNetUsers_AuthorId",
                table: "Stories",
                column: "AuthorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stories_AspNetUsers_AuthorId",
                table: "Stories");

            migrationBuilder.RenameColumn(
                name: "AuthorId",
                table: "Stories",
                newName: "AppUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Stories_AuthorId",
                table: "Stories",
                newName: "IX_Stories_AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Stories_AspNetUsers_AppUserId",
                table: "Stories",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
