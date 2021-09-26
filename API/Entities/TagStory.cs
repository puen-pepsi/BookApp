using API.Entities;

namespace API.Entities
{
    public class TagStory
    {
        public int TagId { get; set; }
        public Tag Tags { get; set; }
        public int StoryId { get; set; }
        public Story Stories { get; set; }
    }
}