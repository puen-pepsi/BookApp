using System;

namespace API.Entities
{
    public class VipUser
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int Amount { get; set; }
        public AppUser UserVip { get; set; }
        public int  UserVipId { get; set; }
        public DateTime ActiveDate { get; set; } = DateTime.UtcNow;
        public DateTime ExpiredDate { get; set; }

    }
}