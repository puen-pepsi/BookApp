using System;

namespace API.Entities
{
    public class Report
    {
        public int id { get; set; }
        public string reportTopic { get; set; }//topic 
        public string reportType { get; set; }//story /comment
        public int reportId { get; set; } //id 
        public string comment { get; set; }
        public int UserId { get; set; }
        public AppUser User { get; set; }
        public DateTime reportCreated { get; set; } = DateTime.UtcNow;

    }
}