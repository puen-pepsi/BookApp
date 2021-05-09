using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class edit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Story_AspNetUsers_AppUserId",
                table: "Story");

            migrationBuilder.DropForeignKey(
                name: "FK_StoryChapter_Published_PublishedId",
                table: "StoryChapter");

            migrationBuilder.DropForeignKey(
                name: "FK_StoryChapter_Story_StoryId",
                table: "StoryChapter");

            migrationBuilder.DropForeignKey(
                name: "FK_StoryComment_AspNetUsers_UserPostId",
                table: "StoryComment");

            migrationBuilder.DropForeignKey(
                name: "FK_StoryComment_Story_StoryId",
                table: "StoryComment");

            migrationBuilder.DropForeignKey(
                name: "FK_StoryTag_Story_StoryId",
                table: "StoryTag");

            migrationBuilder.DropForeignKey(
                name: "FK_StoryTag_Tag_TagId",
                table: "StoryTag");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tag",
                table: "Tag");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StoryTag",
                table: "StoryTag");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StoryComment",
                table: "StoryComment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StoryChapter",
                table: "StoryChapter");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Story",
                table: "Story");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Published",
                table: "Published");

            migrationBuilder.RenameTable(
                name: "Tag",
                newName: "Tags");

            migrationBuilder.RenameTable(
                name: "StoryTag",
                newName: "StoryTags");

            migrationBuilder.RenameTable(
                name: "StoryComment",
                newName: "StoryComments");

            migrationBuilder.RenameTable(
                name: "StoryChapter",
                newName: "StoryChapters");

            migrationBuilder.RenameTable(
                name: "Story",
                newName: "Stories");

            migrationBuilder.RenameTable(
                name: "Published",
                newName: "Publishes");

            migrationBuilder.RenameIndex(
                name: "IX_StoryTag_TagId",
                table: "StoryTags",
                newName: "IX_StoryTags_TagId");

            migrationBuilder.RenameIndex(
                name: "IX_StoryComment_UserPostId",
                table: "StoryComments",
                newName: "IX_StoryComments_UserPostId");

            migrationBuilder.RenameIndex(
                name: "IX_StoryComment_StoryId",
                table: "StoryComments",
                newName: "IX_StoryComments_StoryId");

            migrationBuilder.RenameIndex(
                name: "IX_StoryChapter_StoryId",
                table: "StoryChapters",
                newName: "IX_StoryChapters_StoryId");

            migrationBuilder.RenameIndex(
                name: "IX_StoryChapter_PublishedId",
                table: "StoryChapters",
                newName: "IX_StoryChapters_PublishedId");

            migrationBuilder.RenameIndex(
                name: "IX_Story_AppUserId",
                table: "Stories",
                newName: "IX_Stories_AppUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tags",
                table: "Tags",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StoryTags",
                table: "StoryTags",
                columns: new[] { "StoryId", "TagId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_StoryComments",
                table: "StoryComments",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StoryChapters",
                table: "StoryChapters",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Stories",
                table: "Stories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Publishes",
                table: "Publishes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Stories_AspNetUsers_AppUserId",
                table: "Stories",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StoryChapters_Publishes_PublishedId",
                table: "StoryChapters",
                column: "PublishedId",
                principalTable: "Publishes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StoryChapters_Stories_StoryId",
                table: "StoryChapters",
                column: "StoryId",
                principalTable: "Stories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StoryComments_AspNetUsers_UserPostId",
                table: "StoryComments",
                column: "UserPostId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StoryComments_Stories_StoryId",
                table: "StoryComments",
                column: "StoryId",
                principalTable: "Stories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StoryTags_Stories_StoryId",
                table: "StoryTags",
                column: "StoryId",
                principalTable: "Stories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StoryTags_Tags_TagId",
                table: "StoryTags",
                column: "TagId",
                principalTable: "Tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stories_AspNetUsers_AppUserId",
                table: "Stories");

            migrationBuilder.DropForeignKey(
                name: "FK_StoryChapters_Publishes_PublishedId",
                table: "StoryChapters");

            migrationBuilder.DropForeignKey(
                name: "FK_StoryChapters_Stories_StoryId",
                table: "StoryChapters");

            migrationBuilder.DropForeignKey(
                name: "FK_StoryComments_AspNetUsers_UserPostId",
                table: "StoryComments");

            migrationBuilder.DropForeignKey(
                name: "FK_StoryComments_Stories_StoryId",
                table: "StoryComments");

            migrationBuilder.DropForeignKey(
                name: "FK_StoryTags_Stories_StoryId",
                table: "StoryTags");

            migrationBuilder.DropForeignKey(
                name: "FK_StoryTags_Tags_TagId",
                table: "StoryTags");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tags",
                table: "Tags");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StoryTags",
                table: "StoryTags");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StoryComments",
                table: "StoryComments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StoryChapters",
                table: "StoryChapters");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Stories",
                table: "Stories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Publishes",
                table: "Publishes");

            migrationBuilder.RenameTable(
                name: "Tags",
                newName: "Tag");

            migrationBuilder.RenameTable(
                name: "StoryTags",
                newName: "StoryTag");

            migrationBuilder.RenameTable(
                name: "StoryComments",
                newName: "StoryComment");

            migrationBuilder.RenameTable(
                name: "StoryChapters",
                newName: "StoryChapter");

            migrationBuilder.RenameTable(
                name: "Stories",
                newName: "Story");

            migrationBuilder.RenameTable(
                name: "Publishes",
                newName: "Published");

            migrationBuilder.RenameIndex(
                name: "IX_StoryTags_TagId",
                table: "StoryTag",
                newName: "IX_StoryTag_TagId");

            migrationBuilder.RenameIndex(
                name: "IX_StoryComments_UserPostId",
                table: "StoryComment",
                newName: "IX_StoryComment_UserPostId");

            migrationBuilder.RenameIndex(
                name: "IX_StoryComments_StoryId",
                table: "StoryComment",
                newName: "IX_StoryComment_StoryId");

            migrationBuilder.RenameIndex(
                name: "IX_StoryChapters_StoryId",
                table: "StoryChapter",
                newName: "IX_StoryChapter_StoryId");

            migrationBuilder.RenameIndex(
                name: "IX_StoryChapters_PublishedId",
                table: "StoryChapter",
                newName: "IX_StoryChapter_PublishedId");

            migrationBuilder.RenameIndex(
                name: "IX_Stories_AppUserId",
                table: "Story",
                newName: "IX_Story_AppUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tag",
                table: "Tag",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StoryTag",
                table: "StoryTag",
                columns: new[] { "StoryId", "TagId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_StoryComment",
                table: "StoryComment",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StoryChapter",
                table: "StoryChapter",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Story",
                table: "Story",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Published",
                table: "Published",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Story_AspNetUsers_AppUserId",
                table: "Story",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StoryChapter_Published_PublishedId",
                table: "StoryChapter",
                column: "PublishedId",
                principalTable: "Published",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StoryChapter_Story_StoryId",
                table: "StoryChapter",
                column: "StoryId",
                principalTable: "Story",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StoryComment_AspNetUsers_UserPostId",
                table: "StoryComment",
                column: "UserPostId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StoryComment_Story_StoryId",
                table: "StoryComment",
                column: "StoryId",
                principalTable: "Story",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StoryTag_Story_StoryId",
                table: "StoryTag",
                column: "StoryId",
                principalTable: "Story",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StoryTag_Tag_TagId",
                table: "StoryTag",
                column: "TagId",
                principalTable: "Tag",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
