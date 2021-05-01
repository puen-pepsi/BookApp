using System.Collections.Generic;

namespace API.Entities
{
    public class StoryTag
    {
        public int StoryDetailId { get; set; }
        public StoryDetail StoryDetail { get; set; }
        public int TagId { get; set; }
        public Tag Tag { get; set; }

    }
}