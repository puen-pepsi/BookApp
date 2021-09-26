using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace API.Entities
{
    public class StoryComment
    {
        public int Id { get; set; }
        public int StoryId { get; set; }
        public Story Story { get; set; }
        public int? ChapterId { get; set; }
        public int UserPostId { get; set; }
        public AppUser UserPost { get; set; }
        public int? ParentId { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public string Content { get; set; }
        public virtual ICollection<LikeComment> Liked { get; set; }

        public StoryComment()
        {
            Liked = new Collection<LikeComment>();
        }

    }
}