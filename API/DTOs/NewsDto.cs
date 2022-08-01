namespace API.DTOs
{
    public class NewsDto
    {
        public int id { get; set; }
        public string topic { get; set; }//storyName
        public string headline { get; set; }
        public string content { get; set; }//synopsis
        public string PictureUrl { get; set; }//Image story ?
        //public string Genre { get; set; }
        public int UserNewsId { get; set; }

    }
}