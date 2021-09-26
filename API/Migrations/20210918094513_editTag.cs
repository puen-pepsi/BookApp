using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class editTag : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        protected override void Down(MigrationBuilder migrationBuilder)
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
        }
    }
}
