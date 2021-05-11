using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class editPublish : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StoryChapters_Publishes_PublishedId",
                table: "StoryChapters");

            migrationBuilder.DropIndex(
                name: "IX_StoryChapters_PublishedId",
                table: "StoryChapters");

            migrationBuilder.RenameColumn(
                name: "StoryContentId",
                table: "Publishes",
                newName: "StoryChapterId");

            migrationBuilder.AlterColumn<Guid>(
                name: "PublishedId",
                table: "StoryChapters",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StoryChapters_Publishes_PublishedId1",
                table: "StoryChapters");

            migrationBuilder.DropIndex(
                name: "IX_StoryChapters_PublishedId1",
                table: "StoryChapters");

            migrationBuilder.DropColumn(
                name: "PublishedId1",
                table: "StoryChapters");

            migrationBuilder.RenameColumn(
                name: "StoryChapterId",
                table: "Publishes",
                newName: "StoryContentId");

            migrationBuilder.AlterColumn<Guid>(
                name: "PublishedId",
                table: "StoryChapters",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_StoryChapters_PublishedId",
                table: "StoryChapters",
                column: "PublishedId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_StoryChapters_Publishes_PublishedId",
                table: "StoryChapters",
                column: "PublishedId",
                principalTable: "Publishes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
