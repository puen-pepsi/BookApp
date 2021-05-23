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
        public string Language { get; set; }
        public string ImageUrl { get; set; }
        public int Rating { get; set; }
        public string State { get; set; }="New";
        public int Views { get; set; }
        public string UserName { get; set; }
        public DateTime Created { get; set; }

        

    }
}