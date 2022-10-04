namespace API.Helpers
{
    public class StoryParams :PaginationParams
    {
        // public string CurrentUsername { get; set; }
        public string Genre { get; set; }
        public string Author { get; set; }
        public string StoryType { get; set; }
        public string OrderBy { get; set; } = "created";
        public string OrderByViews { get; set; } ="weekly";
        public string Language { get; set; }
        public string Search { get; set;}
        public int UserId { get; set; }
    }
}