namespace API.DTOs
{
    public class LikeStoryDto
    {
        public int storyId { get; set; }
        public string storyName { get; set; }
        public string genre { get; set; }
        public string username { get; set; }
        public string imageUrl { get; set; }
        public double Rating { get; set; }
        public  int TotalRate { get; set; }

        
    }
}