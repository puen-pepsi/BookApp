using System;

namespace API.Entities
{
    public class StoryComment
    {
        public int Id { get; set; }
        public int StoryDetailId { get; set; }
        public StoryDetail StoryDetail { get; set; }
        public int UserPostId { get; set; }
        public AppUser UserPost { get; set; }
        public int? ParentId { get; set; }
        public DateTime Created { get; set; }
        public string Content { get; set; }



    }
}