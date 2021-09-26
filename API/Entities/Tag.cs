using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace API.Entities
{
    public class Tag
    {
        public int Id { get; set; }
        public string TagName { get; set; }
        //public ICollection<StoryTag> StoryTags { get; set; }  
        public virtual ICollection<TagStory> TagStories { get; set; }  

        public Tag()
        {
            TagStories = new Collection<TagStory>();
        }
    }
}