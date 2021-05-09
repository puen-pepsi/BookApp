using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IStoryRepository
    {
         void AddStory(Story story);
         void AddStoryChapter(StoryChapter storyChapter);
         void UpdateStory(Story story);
         void UpdateStoryChapter(StoryChapter storyChapter);
         Task<IEnumerable<Story>> GetStoryAsync();
         Task<IEnumerable<Story>> GetStoryByUserName(string username);
        Task<Story> GetStoryById(int id,bool includeRelated = false );
        // Task<Story> GetStoryById(int id);

         Task<StoryChapter> GetStoryChapterByStoryId(int id);

         void DeleteStory(Story story);

         Task<IEnumerable<Genre>> GetAllGenre();

    }
}