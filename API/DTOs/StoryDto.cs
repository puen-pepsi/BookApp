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
        public string GetState { get; set; }
        public bool Deleted { get; set; }
        // public string LastChapter { get; set; }
        public int Views { get; set; }
        //user author
        public string UserName { get; set; }
        public string KnownAs {get;set;}
        public int AuthorId { get; set; }
        public string UserPhoto { get; set; }
        public string Title { get; set; }
        public int Point { get; set; }
        public DateTime Created { get; set; }
        public double Rating { get; set; }
        //Liked => boolean
        public string fregment { get; set; }
        public bool Liked { get; set; }
        public int YourRate { get; set; }
        public  int TotalRate { get; set; }
        public int TotalChapter { get; set; }
        public string Tags { get; set; }
        public string LastChapterName { get; set; }    
        public string LastChapterCreate { get; set; }    
        // public StoryDto()
        // {   
        //     Chapters = new Collection<StoryChapterDto>();
        // }
    }
}