using System;

namespace API.Entities
{
    public class View
    {
        public int Id { get; set; }
        public Story StoryView{ get; set; }
        public int StoryViewId { get; set; }
        public AppUser UserView { get; set; }
        public int UserViewId { get; set; }
        public DateTime RateCreated { get; set; } = DateTime.UtcNow;
    }
}