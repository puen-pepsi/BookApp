namespace API.Entities
{
    public class RecievePoint
    {
        public int Id { get; set; }
        public int ActivitiesId { get; set; }
        public Activities Activities { get; set; }
        public int RecievePointUserId { get; set; }
        public AppUser RecievePointUser { get; set; }
        public int Point { get; set; }

    }
}