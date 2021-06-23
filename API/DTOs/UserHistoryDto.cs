using System;

namespace API.DTOs
{
    public class UserHistoryDto
    {
        public int SourceUserId { get; set; }
        public int HistoryStoryId { get; set; }
        public string fregment { get; set; }
        public DateTime Created { get; set; }
    }
}