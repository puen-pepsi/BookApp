using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using API.Entities;

namespace API.DTOs
{
    public class StoryDto
    {
        public int StoryId { get; set; }
        public string StoryName { get; set; }
        public string Description { get; set; }        
        public string Genre { get; set; }
        public string Type { get; set; }
        public string Language { get; set; }
        public string ImageUrl { get; set; }
        public string State { get; set; }
        public int Views { get; set; }
        public string UserName { get; set; }
        public int AuthorId { get; set; }
        public string UserPhoto { get; set; }
        public DateTime Created { get; set; }
        public double Rating { get; set; }
        public  int TotalRate { get; set; }
        public int YourRate { get; set; }
        public int TotalChapter { get; set; }
        public string Tags { get; set; }
    
        // public ICollection<StoryChapterDto> Chapters { get; set; }
        // public StoryDto()
        // {   
        //     Chapters = new Collection<StoryChapterDto>();
        // }
    }
}