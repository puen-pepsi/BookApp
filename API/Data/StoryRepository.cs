using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoryRepository : IStoryRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public StoryRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public void AddStory(Story story)
        {
             _context.Stories.Add(story);
        }

        public void AddStoryChapter(StoryChapter storyChapter)
        {
            _context.StoryChapters.Add(storyChapter);
        }



        public void DeleteStory(Story story)
        {
            _context.Stories.Remove(story);
        }

        public async Task<IEnumerable<Story>> GetStoryAsync(string username)
        {   
            return await _context.Stories
                        .Where(s => s.UserName == username)
                        .ToListAsync();
        }

        public async Task<Story> GetStoryById(int id,bool includeRelated = false)
        {
            if(!includeRelated)
                return await _context.Stories.FindAsync(id);
            return await _context.Stories
                            .Include(s => s.Chapters)
                                .ThenInclude(sc => sc.Published)
                            .Include(p => p.PhotoStories)
                            .SingleOrDefaultAsync(s => s.Id == id);
        }
        // public async Task<Story> GetStoryById(int id)
        // {
        //         return await _context.Stories.FindAsync(id);
        // }

        public async Task<IEnumerable<Story>> GetStoryByUserName(string username)
        {                
            return await _context.Stories
                .Where(x => x.UserName == username)
                .ToListAsync();
        }

        public Task<StoryChapter> GetStoryChapter(int id)
        {
            throw new System.NotImplementedException();
        }


        public void UpdateStory(Story story)
        {
            _context.Entry(story).State = EntityState.Modified;
        }

        public void UpdateStoryChapter(StoryChapter storyChapter)
        {
            _context.Entry(storyChapter).State = EntityState.Modified;
        }


        public Task<StoryChapter> GetStoryChapterById(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<StoryChapter> GetStoryChapterByStoryId(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<Story>> GetStoryAsync()
        {
            throw new System.NotImplementedException();
        }

        public async Task<IEnumerable<Genre>> GetAllGenre()
        {
            return  await _context.Genres.ToListAsync();
        }
    }
}