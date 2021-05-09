using System.Collections.Generic;

namespace API.Entities
{
    public class StoryTag
    {
        public int StoryId { get; set; }
        public Story Story{ get; set; }
        public int TagId { get; set; }
        public Tag Tag { get; set; }

    }
}