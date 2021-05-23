using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class RatingTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rating_AspNetUsers_UserRatedId",
                table: "Rating");

            migrationBuilder.DropForeignKey(
                name: "FK_Rating_Stories_StoryRatedId",
                table: "Rating");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Rating",
                table: "Rating");

            migrationBuilder.RenameTable(
                name: "Rating",
                newName: "Ratings");

            migrationBuilder.RenameIndex(
                name: "IX_Rating_UserRatedId",
                table: "Ratings",
                newName: "IX_Ratings_UserRatedId");

            migrationBuilder.RenameIndex(
                name: "IX_Rating_StoryRatedId",
                table: "Ratings",
                newName: "IX_Ratings_StoryRatedId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Ratings",
                table: "Ratings",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_AspNetUsers_UserRatedId",
                table: "Ratings",
                column: "UserRatedId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Stories_StoryRatedId",
                table: "Ratings",
                column: "StoryRatedId",
                principalTable: "Stories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_AspNetUsers_UserRatedId",
                table: "Ratings");

            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Stories_StoryRatedId",
                table: "Ratings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Ratings",
                table: "Ratings");

            migrationBuilder.RenameTable(
                name: "Ratings",
                newName: "Rating");

            migrationBuilder.RenameIndex(
                name: "IX_Ratings_UserRatedId",
                table: "Rating",
                newName: "IX_Rating_UserRatedId");

            migrationBuilder.RenameIndex(
                name: "IX_Ratings_StoryRatedId",
                table: "Rating",
                newName: "IX_Rating_StoryRatedId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Rating",
                table: "Rating",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Rating_AspNetUsers_UserRatedId",
                table: "Rating",
                column: "UserRatedId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rating_Stories_StoryRatedId",
                table: "Rating",
                column: "StoryRatedId",
                principalTable: "Stories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
