using System.Collections.Generic;

namespace API.Entities
{
    public class Tag
    {
        public int Id { get; set; }
        public string HashTag { get; set; }
        public ICollection<StoryTag> StoryTags { get; set; }    
        }
}