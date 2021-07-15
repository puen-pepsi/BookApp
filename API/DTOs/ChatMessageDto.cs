using System;

namespace API.DTOs
{
    public class ChatMessageDto
    {
         public int Id { get; set; }
        public DateTime Created { get; set; }
        public string Content { get; set; }
        public string UserName { get; set; }
        public string KnownAs { get; set; } 
        public string Image { get; set; }

    }
}