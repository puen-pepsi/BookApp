using System;

namespace API.Entities
{
    public class TitleActive
    {
        public int Id { get; set; }
        public int TitleNameId { get; set; }
        public TitleName TitleName { get; set; }
        public string Name { get; set; }
        public ActivitiesType Type { get; set; }
        public bool IsMain { get; set; }
        public int AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public DateTime TitleCreated { get; set; } = DateTime.UtcNow;
    }
}