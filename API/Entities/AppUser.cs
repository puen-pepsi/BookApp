using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public DateTime DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateTime LastActive { get; set; } = DateTime.UtcNow;
        //public string Gender { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        //edit faster
        public int Point { get; set; }
        public string Title { get; set; }
        //Add Column here
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
        public ICollection<Banner> Banners { get; set; }
        public ICollection<Photo> Photos { get; set; }
        // Users Click Like
        public ICollection<UserLike> LikedByUsers { get; set; }
        // Liked Users
        public ICollection<UserLike> LikedUsers { get; set; }
        public ICollection<UserStory> LikedStoryByUsers { get; set; }//Library
        public ICollection<UserHistory> UserHistory { get; set; }
        public ICollection<Message> MessagesSent { get; set; }
        public ICollection<Message> MessagesReceived { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
        public ICollection<Story> Stories { get; set; }
        public ICollection<StoryComment> StoryComments {get; set;}
        public ICollection<RecievePoint> recievePoints { get; set; }
        public ICollection<TitleActive> titleAcitive {get;set;}
        public ICollection<VipUser> VipUsers { get; set; }
        public AppUser()
        {
            Photos = new Collection<Photo>();
            LikedByUsers = new Collection<UserLike>();
            LikedUsers = new Collection<UserLike>();
            LikedStoryByUsers = new Collection<UserStory>();
            UserHistory  = new Collection<UserHistory>();
            MessagesSent = new Collection<Message>();
            MessagesReceived = new Collection<Message>();
            UserRoles = new Collection<AppUserRole>();
            Stories = new Collection<Story>();
            StoryComments = new Collection<StoryComment>();
            recievePoints = new Collection<RecievePoint>();
            titleAcitive = new Collection<TitleActive>();
            VipUsers = new Collection<VipUser>();
        }

    }
}