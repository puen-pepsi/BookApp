using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IStoryRepository
    {
         void AddStory(Story story);
         void AddStoryChapter(StoryChapter storyChapter);
         void AddPublished(Published publish);
         void AddComment(StoryComment storyComment);
         void UpdateStory(Story story);
         void UpdateStoryChapter(StoryChapter storyChapter);
         Task<PagedList<StoryDto>> GetStoriesAsync(StoryParams storyParams);
         Task<PagedList<StoryDto>> GetAuthorStory(AuthorStoryParams authorStoryParams);
         Task<IEnumerable<Story>> GetStoryAsync();
         Task<IEnumerable<Story>> GetStoryByUserName(string username);
         Task<IEnumerable<StoryCommentDto>> GetStoryComments(string storyName);
         Task<IEnumerable<StoryChapter>> GetStoryChapterByStoryId(int id,bool published);
        Task<IEnumerable<StoryChapter>> GetStoryChapterByStoryName(string storyName);
        Task<IEnumerable<StoryChapter>> GetNewChaper(int take);//published
        Task<StoryChapter> GetLastChapterByStoryName(string storyName);
        Task<IEnumerable<StoryChapter>> GetStoryChapterByStoryNameTake(string storyName,int countSize,int pageSize);

         Task<Story> GetStoryById(int id,bool includeRelated = false );
        // Task<Story> GetStoryById(int id);
         Task<Story> GetStoryByName(string storyName);
         Task<StoryChapter> GetStoryChapterById(int id);
         Task<StoryComment> GetStoryCommentById(int id);
         Task<Rating> GetYouRate(int storyId,int userId);
         Task<Activities> GetLikedComment(int commentId,int userId);
         void DeleteStory(Story story);
         void DeletStoryComment(StoryComment storyComment);
         void DeleteLikeComment(Activities activities);

    }
}