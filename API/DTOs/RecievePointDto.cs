using System;
using API.Entities;

namespace API.DTOs
{
    public class RecievePointDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string  StoryName { get; set; }
        public ActivitiesType Type { get; set; }
        public DateTime  ActivitiesCreated { get; set; }
        public int Point { get; set; }
    }
}