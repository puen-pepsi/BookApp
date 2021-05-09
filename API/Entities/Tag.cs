using System.Collections.Generic;

namespace API.Entities
{
    public class Tag
    {
        public int Id { get; set; }
        public string TagName { get; set; }
        public ICollection<StoryTag> StoryTags { get; set; }    
    }
}