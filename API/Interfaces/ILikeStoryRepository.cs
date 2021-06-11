using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ILikeStoryRepository
    {
        Task<UserStory> GetUserLikeStory(int sourceUserId,int likedstoryId);
        Task<AppUser> GetStoryWithLikeStory(int userId);
        Task<PagedList<LikeStoryDto>> GetStoryLikes(LikeStoryParams likeStoryParams);
    }
}