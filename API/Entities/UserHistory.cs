using System;

namespace API.Entities
{
    public class UserHistory
    {
        public AppUser SourceUser { get; set; }
        public Story HistoryStory { get; set; }
        public int SourceUserId { get; set; }
        public int HistoryStoryId { get; set; }
        public string fregment { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
    }
}