using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace API.Entities
{
    public class Story
    {
        public int Id { get; set; }
        public string StoryName { get; set; }
        public string Description { get; set; }        
        public string Genre { get; set; }
        public string Language { get; set; }
        public string ImageUrl { get; set; }
        public int Rating { get; set; }
        public string State { get; set; }
        public int Views { get; set; }
        public string UserName { get; set; }
        public int AuthorId { get; set; }
        public AppUser Author { get; set; }
        public DateTime Created { get; set; }
        public string Tags { get; set; }
        public virtual ICollection<PhotoStory> PhotoStories { get; set; }
        public virtual ICollection<StoryChapter> Chapters { get; set; }
        public virtual ICollection<StoryComment> PostComments { get; set; }
        //public virtual ICollection<StoryTag> StoryTags { get; set; }
        public virtual ICollection<Rating> Ratings { get; set; }
        public virtual  ICollection<UserStory> StoryLiked { get; set; }
        public virtual ICollection<UserHistory> StoryHistory { get; set; }
        public Story()
        {
            Chapters = new Collection<StoryChapter>();
            PostComments = new Collection<StoryComment>();
            //StoryTags = new Collection<StoryTag>();
            PhotoStories = new Collection<PhotoStory>();
            Ratings = new Collection<Rating>();
            StoryLiked = new Collection<UserStory>();
            StoryHistory =new Collection<UserHistory>();
        }
    }
}