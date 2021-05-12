using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class editPublic : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StoryChapters_Publishes_PublishedId1",
                table: "StoryChapters");

            migrationBuilder.DropIndex(
                name: "IX_StoryChapters_PublishedId1",
                table: "StoryChapters");

            migrationBuilder.DropColumn(
                name: "PublishedId",
                table: "StoryChapters");

            migrationBuilder.DropColumn(
                name: "PublishedId1",
                table: "StoryChapters");

            migrationBuilder.RenameColumn(
                name: "PublishedDate",
                table: "Publishes",
                newName: "Created");

            migrationBuilder.CreateIndex(
                name: "IX_Publishes_StoryChapterId",
                table: "Publishes",
                column: "StoryChapterId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Publishes_StoryChapters_StoryChapterId",
                table: "Publishes",
                column: "StoryChapterId",
                principalTable: "StoryChapters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Publishes_StoryChapters_StoryChapterId",
                table: "Publishes");

            migrationBuilder.DropIndex(
                name: "IX_Publishes_StoryChapterId",
                table: "Publishes");

            migrationBuilder.RenameColumn(
                name: "Created",
                table: "Publishes",
                newName: "PublishedDate");

            migrationBuilder.AddColumn<Guid>(
                name: "PublishedId",
                table: "StoryChapters",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PublishedId1",
                table: "StoryChapters",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_StoryChapters_PublishedId1",
                table: "StoryChapters",
                column: "PublishedId1");

            migrationBuilder.AddForeignKey(
                name: "FK_StoryChapters_Publishes_PublishedId1",
                table: "StoryChapters",
                column: "PublishedId1",
                principalTable: "Publishes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
