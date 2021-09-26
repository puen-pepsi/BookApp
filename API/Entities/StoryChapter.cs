using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace API.Entities
{
    public class StoryChapter
    {
        public int Id { get; set; }
        public string ChapterName { get; set; }
        public string Content { get; set; }
        public int? Order { get; set; }
        public int views { get; set; }
        public int StoryId { get; set; }
        public Story Story { get; set; }
        public bool EndChapter { get; set; }
        public Published Published { get; set; }
        public virtual ICollection<LikeChapter> LikeChapters { get; set; }

        public StoryChapter()
        {
            LikeChapters = new Collection<LikeChapter>();
        }

    }
}