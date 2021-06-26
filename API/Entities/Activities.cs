namespace API.Entities
{
    public class Activities
    {
        public int Id { get; set; }
        public int UserActiveId { get; set; }
        public AppUser UserActive { get; set; }
        public int ParentId { get; set; }
    }
}