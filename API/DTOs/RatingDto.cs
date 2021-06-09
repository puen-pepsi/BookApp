using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RatingDto
    {
         public int Id { get; set; }
        public int Rated { get; set; }
        public int StoryRatedId { get; set; }
        public int UserRatedId { get; set; }
    }
}