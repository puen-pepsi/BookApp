namespace API.DTOs
{
    public class ReportDto
    {
        public int id { get; set; }
        public string reportTopic { get; set; }//topic 
        public string reportType { get; set; }//story /comment
        public int reportId { get; set; } //id 
        public string comment { get; set; }
        public string UserName { get; set; }

    }
}