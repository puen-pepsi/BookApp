namespace API.DTOs
{
    public class StoryTagDto
    {
        public int storyId { get; set; }
        public string storyName { get; set; }
        public string Genre { get; set; }
        public string Description { get; set; }  
        public string UserName { get; set; }
        public string UserPhoto { get; set; }
        public string imageUrl { get; set; }
        public double Rating { get; set; }
        public string Tags { get; set; }
    }
}