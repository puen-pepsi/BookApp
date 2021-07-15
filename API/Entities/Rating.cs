using System;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Rating
    {
        public int Id { get; set; }
        public int Rated { get; set; }
        public Story StoryRated{ get; set; }
        public int StoryRatedId { get; set; }
        public AppUser UserRated { get; set; }
        public int UserRatedId { get; set; }
        public DateTime RateCreated { get; set; } = DateTime.UtcNow;
    }
}