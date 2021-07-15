using System;

namespace API.Entities
{
    public class Subscribtion
    {
        public int id { get; set; }
        public string Email { get; set; }
        public DateTime SubscribtionCreated { get; set; } = DateTime.UtcNow;
    }
}