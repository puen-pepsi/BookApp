using System;
using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class StoryCommentDto
    {
        public int Id { get; set; }
        public int StoryId { get; set; }
        // public int? ChapterId { get; set; }
        public int? ParentId { get; set; }
        public int? ChapterId { get; set; }
        public DateTime Created { get; set; }
        public string Content { get; set; }
        public string UserName { get; set; }
        public string KnownAs { get; set; } 
        public int Point { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }

        //list for user like
        public IEnumerable<string> liked { get; set; }
    }
}