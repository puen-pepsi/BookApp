using System;

namespace API.DTOs
{
    public class TitleActiveDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsMain { get; set; }
        public DateTime TitleCreate { get; set; }

    }
}