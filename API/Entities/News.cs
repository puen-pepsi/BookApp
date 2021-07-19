using System;

namespace API.Entities
{
    public class News
    {
        public int id { get; set; }
        public string topic { get; set; }//storyName
        public string content { get; set; }//synopsis
        public string PictureUrl { get; set; }//Image story ?
        //public string Genre { get; set; }
        public int UserNewsId { get; set; }
        public AppUser UserNews { get; set; }
        public DateTime NewsCreated { get; set; } = DateTime.UtcNow;

    }
}