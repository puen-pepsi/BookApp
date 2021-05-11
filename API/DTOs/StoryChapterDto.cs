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
        public int Order { get; set; }
        public int StoryId { get; set; }
    }
}