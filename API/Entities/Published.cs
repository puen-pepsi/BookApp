using System;

namespace API.Entities
{
    public class Published
    {
        public Guid Id { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public int StoryChapterId { get; set; }


    }
}