using System;

namespace API.Entities
{
    public class News
    {
        public int id { get; set; }
        public string topic { get; set; }
        public string content { get; set; }
        public string PictureUrl { get; set; }
        public DateTime NewsCreated { get; set; } = DateTime.UtcNow;
        public int UserNewsId { get; set; }
        public AppUser UserNews { get; set; }

    }
}