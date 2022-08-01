using System;

namespace API.DTOs
{
    public class NewsShowDto
    {
         public int id { get; set; }
        public string topic { get; set; }//storyName
        public string headline {get;set;}
        public string content { get; set; }//synopsis
        public string PictureUrl { get; set; }//Image story ?
        //public string Genre { get; set; }
        public string UserName { get; set; }
        public string UserPhoto { get; set; }
        public DateTime NewsCreated { get; set; }
    }
}