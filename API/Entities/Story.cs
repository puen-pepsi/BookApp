using System.Collections.Generic;

namespace API.Entities
{
    public class Story
    {
        public int Id { get; set; }
        public string StoryName { get; set; }
        // public int RecentChapter { get; set; }
        public string Synopsis { get; set; }
        public int GenreId { get; set; }
        public Statuses  Genre { get; set; }
        public bool CopyRight { get; set; }
        public int Rating { get; set; }
        public string State { get; set; }
        public int Views { get; set; }
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }

        public  ICollection<StoryDetail> StoryDetails { get; set; }
       
    }
}