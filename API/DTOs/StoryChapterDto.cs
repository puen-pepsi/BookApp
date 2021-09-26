using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class StoryChapterDto
    {
        public int Id {get; set;}
        [Required]
        [StringLength(255)]
        public string ChapterName { get; set; }
        [Required]
        public string Content { get; set; }
        public int? Order { get; set; }
        public string StoryName { get; set; }
        public string ImageUrl { get; set; }
        public int StoryId { get; set; }
        public bool EndChapter { get; set; }
        public string AuthorName { get; set; }
        public string AuthorImageUrl { get; set; }

        [Required]
        public Guid PublishedId { get; set; }
        public DateTime PublishedCreated { get; set; }

        public IEnumerable<string> LikeChapter { get; set; }
    }
}