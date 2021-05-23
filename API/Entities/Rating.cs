using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Rating
    {
        public int Id { get; set; }
        [Required]
        public int Rated { get; set; }
        public Story StoryRated{ get; set; }
        [Required]
        public int StoryRatedId { get; set; }
        public AppUser UserRated { get; set; }
        [Required]
        public int UserRatedId { get; set; }
    }
}