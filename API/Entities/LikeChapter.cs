using System;

namespace API.Entities
{
    public class LikeChapter
    {
        public int Id { get; set; }
        public int UserActiveId { get; set; }
        public AppUser UserActive { get; set; }
        public int ChapterId { get; set; }
        public StoryChapter Chapter { get; set; }
        public DateTime LikeChapterCreate { get; set; } = DateTime.UtcNow;
    }
}