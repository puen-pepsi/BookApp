using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class PhotoStory
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }
        public Story  story { get; set; }
        public int StoryId { get; set; }
    }
}