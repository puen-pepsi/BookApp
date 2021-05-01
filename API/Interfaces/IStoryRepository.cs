using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IStoryRepository
    {
         void AddStory(Story story);
         void AddStoryDetail(StoryDetail storyDetail);
         void UpdateStory(Story story);
         void UpdateStoryDetail(StoryDetail storyDetail);
         Task<IEnumerable<Story>> GetStoryAsync();
         Task<IEnumerable<StoryDetail>> GetStoryDetailsAsync();
         Task<Story> GetStoryById(int id);
         Task<StoryDetail> GetStoryDetailById(int id);

    }
}