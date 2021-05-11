using System;

namespace API.Entities
{
    public class Published
    {
        public Guid Id { get; set; }
        public DateTime PublishedDate { get; set; }
        public int StoryChapterId { get; set; }


    }
}