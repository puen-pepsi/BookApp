using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class viewcount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Views",
                table: "Stories");

            migrationBuilder.CreateTable(
                name: "Views",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    StoryViewId = table.Column<int>(type: "INTEGER", nullable: false),
                    UserViewId = table.Column<int>(type: "INTEGER", nullable: false),
                    RateCreated = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Views", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Views_AspNetUsers_UserViewId",
                        column: x => x.UserViewId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Views_Stories_StoryViewId",
                        column: x => x.StoryViewId,
                        principalTable: "Stories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Views_StoryViewId",
                table: "Views",
                column: "StoryViewId");

            migrationBuilder.CreateIndex(
                name: "IX_Views_UserViewId",
                table: "Views",
                column: "UserViewId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Views");

            migrationBuilder.AddColumn<int>(
                name: "Views",
                table: "Stories",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
