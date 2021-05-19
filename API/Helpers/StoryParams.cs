namespace API.Helpers
{
    public class StoryParams :PaginationParams
    {
        // public string CurrentUsername { get; set; }
        public string Genre { get; set; }
        public string Author { get; set; }
        public string OrderBy { get; set; } = "created";
    }
}