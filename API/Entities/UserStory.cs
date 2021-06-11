namespace API.Entities
{
    public class UserStory
    {
        public AppUser SourceUser { get; set; }
        public Story LikedStory { get; set; }
        public int SourceUserId { get; set; }
        public int LikedStoryId { get; set; }
    }
}