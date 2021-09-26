namespace API.Entities
{
    public class ActivitiesPoint
    {
        public int Id { get; set; }
        public ActivitiesType Type { get; set; }
        public string ActivitiesName { get; set; }
        public int ActiveUserPoint { get; set; }
        public int AuthorPoint { get; set; }

    }
}