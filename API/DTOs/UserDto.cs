using System.Collections.Generic;

namespace API.DTOs
{
    public class UserDto
    {
        public string Username { get; set; }
        public string Token { get; set; }
        public string PhotoUrl { get; set; }
        public string KnownAs { get; set; }
        public int Point { get; set; }
        public string Title { get; set; }
        //public string Gender { get; set; }
        //public IEnumerable<int> MyList { get; set; } 
    }
}