using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class ChapterListDto
    {
        public int Id {get; set;}
        public int Order { get; set; }
        [Required]
        [StringLength(255)]
        public string ChapterName { get; set; }
        [Required]
        public DateTime PublishedCreated { get; set; }
        public bool EndChapter { get; set; }
    }
}