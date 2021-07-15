namespace API.Entities
{
    public class Report
    {
        public int id { get; set; }
        public int UserId { get; set; }
        public AppUser User { get; set; }

        public string details { get; set; }
    }
}