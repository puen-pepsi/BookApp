using System;
using API.Entities;

namespace API.DTOs
{
    public class StoryCommentDto
    {
        public int Id { get; set; }
        public int StoryId { get; set; }
        public int? ParentId { get; set; }
        public DateTime Created { get; set; }
        public string Content { get; set; }
        public string UserName { get; set; }
        public string KnownAs { get; set; } 
        public string Image { get; set; }
    }
}