using System;

namespace API.DTOs
{
    public class PublishedDto
    {
        public Guid Id { get; set; }
        public DateTime Created { get; set; }
        public int StoryChapterId { get; set; }
    }
}