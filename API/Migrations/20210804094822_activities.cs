using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class activities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Activities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserActiveId = table.Column<int>(type: "INTEGER", nullable: false),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    storyId = table.Column<int>(type: "INTEGER", nullable: false),
                    ActivitiesCreate = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Activities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Activities_AspNetUsers_UserActiveId",
                        column: x => x.UserActiveId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Activities_Stories_storyId",
                        column: x => x.storyId,
                        principalTable: "Stories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ActivitiesPoints",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    ActivitiesName = table.Column<string>(type: "TEXT", nullable: true),
                    ActiveUserPoint = table.Column<int>(type: "INTEGER", nullable: false),
                    AuthorPoint = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivitiesPoints", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ranks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    MinPoint = table.Column<int>(type: "INTEGER", nullable: false),
                    MaxPoint = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ranks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RecievePoints",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ActivitiesId = table.Column<int>(type: "INTEGER", nullable: false),
                    RecievePointUserId = table.Column<int>(type: "INTEGER", nullable: false),
                    Point = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecievePoints", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecievePoints_Activities_ActivitiesId",
                        column: x => x.ActivitiesId,
                        principalTable: "Activities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RecievePoints_AspNetUsers_RecievePointUserId",
                        column: x => x.RecievePointUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Activities_storyId",
                table: "Activities",
                column: "storyId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_UserActiveId",
                table: "Activities",
                column: "UserActiveId");

            migrationBuilder.CreateIndex(
                name: "IX_RecievePoints_ActivitiesId",
                table: "RecievePoints",
                column: "ActivitiesId");

            migrationBuilder.CreateIndex(
                name: "IX_RecievePoints_RecievePointUserId",
                table: "RecievePoints",
                column: "RecievePointUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActivitiesPoints");

            migrationBuilder.DropTable(
                name: "Ranks");

            migrationBuilder.DropTable(
                name: "RecievePoints");

            migrationBuilder.DropTable(
                name: "Activities");
        }
    }
}
