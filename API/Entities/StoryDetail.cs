using System;
using System.Collections.Generic;

namespace API.Entities
{
    public class StoryDetail
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int MainCharacter { get; set; }
        public DateTime Created { get; set; }
        public string tag { get; set; }
        public string ImageUrl { get; set; }
        public string PublicId { get; set; }
        public int CurrentStoriesId { get; set; }
        public  Story  CurrnetStory { get; set; }

        public ICollection<StoryComment> PostComments { get; set; }
        public ICollection<StoryTag> StoryTags { get; set; }
    }
}