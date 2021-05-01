using System;

namespace API.Entities
{
    public class StoryContent
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int StoryDetailId { get; set; }
        public StoryDetail StoryDetail { get; set; }
        public int PublicId { get; set; }

    }
}