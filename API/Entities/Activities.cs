using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace API.Entities
{
    public class Activities
    {
        public int Id { get; set; }
        public int UserActiveId { get; set; }
        public AppUser UserActive { get; set; }
        public ActivitiesType Type { get; set; }
        public int storyId { get; set; }
        public Story story { get; set; }
        public DateTime ActivitiesCreate { get; set; } = DateTime.UtcNow;
        // public int UserRecievePointId { get; set; }
        // public AppUser UserRecievePoint { get; set; }

        public virtual ICollection<RecievePoint> getPoint { get; set; }
        public Activities()
        {
            getPoint = new Collection<RecievePoint>();
        }
    }
}