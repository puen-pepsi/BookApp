using System;

namespace API.DTOs
{
    public class VipUserDto
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int Amount { get; set; }
        public string  UserName { get; set; }
        public DateTime ActiveDate { get; set; } 
        public DateTime ExpiredDate { get; set; }
    }
}