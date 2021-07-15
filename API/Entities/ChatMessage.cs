using System;

namespace API.Entities
{
    public class ChatMessage
    {
        public int Id { get; set; }
        public int UserChatId { get; set; }
        public string GroupName{ get; set; }
        public AppUser UserChat { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public string Content { get; set; }

    }
}