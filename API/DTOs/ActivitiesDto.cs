using System;
using System.ComponentModel.DataAnnotations;
using API.Entities;

namespace API.DTOs
{
    public class ActivitiesDto
    {
        public int Id { get; set; }
        public int UserActiveId { get; set; }
        public string ActionName{ get; set; }
        public string StoryName { get; set; }
        public DateTime ActivitiesCreate { get; set; } 
        // public int UserRecievePointId { get; set; }
        // public AppUser UserRecievePoint { get; set; }
       [Required]
        public int RecievePointId { get; set; }
        public int RecievePointPoint { get; set; }

    }
}