using System;

namespace API.Entities
{
    public class LikeComment
    {
         public int Id { get; set; }
        public int UserLikeCommentId { get; set; }
        public AppUser UserLikeComment { get; set; }
        public int ParentId { get; set; }
        public DateTime LikeCommentCreate { get; set; } = DateTime.UtcNow;
        //type of Activities
    }
}