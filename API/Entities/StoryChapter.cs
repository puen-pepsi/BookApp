using System;

namespace API.Entities
{
    public class StoryChapter
    {
        public int Id { get; set; }
        public string ChapterName { get; set; }
        public string Content { get; set; }
        public int Order { get; set; }
        public int views { get; set; }
        public int StoryId { get; set; }
        public Story Story { get; set; }
        public Published Published { get; set; }

    }
}