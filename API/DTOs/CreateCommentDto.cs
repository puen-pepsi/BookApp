namespace API.DTOs
{
    public class CreateCommentDto
    {
        public string StoryName { get; set; }
        public string Content { get; set; }
        public int? ParentId { get; set; }
    }
}