namespace API.DTOs
{
    public class StoryViewsDto
    {
        public int StoryId { get; set; }
        public string StoryName { get; set; }
        public int AuthorId { get; set; }
        public string AuthorName { get; set; }
        public int Views { get; set; }

    }
}