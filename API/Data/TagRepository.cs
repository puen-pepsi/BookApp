using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class TagRepository : ITagRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public TagRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }

        public  void DeleteStoryTag(int storyId)
        {
            var tagstory =  _context.TagStories
                                .Where(x => x.StoryId == storyId)
                                .ToList();
             _context.TagStories.RemoveRange(tagstory);
        }

        public string[] GetAllTags()
        {
            return      _context.Tags
                            .Select( x => x.TagName).ToArray();
        }

        public async Task<IEnumerable<TagStory>> GetStoryByTagName(string name)
        {
            return await _context.TagStories
                            .Include(x => x.Stories)
                            .Where(x => x.Tags.TagName.ToLower() == name.ToLower())
                            .ToListAsync();
        }

        public  Tag GetTagName(string name)
        {
            return      _context.Tags
                        .FirstOrDefault(x => x.TagName.ToLower() == name.ToLower());
        }

        public async Task<TagStory> GetTagStory(int tagId, int storyId)
        {
            return await _context.TagStories.FindAsync(tagId,storyId);             
        }

    }
}