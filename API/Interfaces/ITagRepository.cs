using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ITagRepository
    {
         Tag GetTagName(string name);
         Task<IEnumerable<TagStory>> GetStoryByTagName(string name);
         Task<TagStory> GetTagStory(int tagId,int storyId);
         string[] GetAllTags();
         void DeleteStoryTag(int storyId);


    }
}