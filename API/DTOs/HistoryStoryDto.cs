using System;

namespace API.DTOs
{
    public class HistoryStoryDto
    {
        public int storyId { get; set; }
        public string storyName { get; set; }
        public string Description { get; set; }  
        public string genre { get; set; }
        public DateTime  CreateAt { get; set; }
        public string UserName { get; set; }
        public string UserPhoto { get; set; }
        public string imageUrl { get; set; }
        public double Rating { get; set; }
        public  int TotalRate { get; set; }
        public string fregment { get; set; }
         public int TotalChapter { get; set; }
         public int Views { get; set; }
         public string State { get; set; }
        public DateTime Created { get; set; }
    }
}