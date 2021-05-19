using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace API.DTOs
{
    public class StoryDetailDto
    {
        public int StoryId { get; set; }
        public string StoryName { get; set; }
        public string Description { get; set; }        
        public string Genre { get; set; }
        public string Language { get; set; }
        public string ImageUrl { get; set; }
        public int Rating { get; set; }
        public string State { get; set; }
        public int Views { get; set; }
        public string UserName { get; set; }
        public DateTime Created { get; set; }
        public ICollection<StoryChapterDto> Chapters {get; set;}

        public StoryDetailDto()
        {
            Chapters = new Collection<StoryChapterDto>();
        }
    }
}