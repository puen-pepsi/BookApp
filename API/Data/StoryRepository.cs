using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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

        public void AddPublished(Published publish)
        {
            _context.Publishes.Add(publish);
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
                            .Include(s=> s.Author)
                                .ThenInclude(a => a.Photos)       
                            .Include(p => p.PhotoStories)
                            .Include(s => s.Ratings)
                            .Include(h => h.StoryHistory)
                            .SingleOrDefaultAsync(s => s.Id == id);
        }
        // public async Task<Story> GetStoryById(int id)
        // {
        //         return await _context.Stories.FindAsync(id);
        // }

        public async Task<IEnumerable<Story>> GetStoryByUserName(string username)
        {                
            return await _context.Stories
                .Include(s => s.Ratings)
                .Include(s=> s.Author)
                    .ThenInclude(a => a.Photos)  
                .Where(x => x.UserName == username)
                .ToListAsync();
        }
        public async Task<Story> GetStoryByName(string storyName)
        {
             return await _context.Stories
                            .Include(s => s.Chapters)
                                .ThenInclude(sc => sc.Published)
                            .Include(s=> s.Author)
                                .ThenInclude(a => a.Photos)  
                            .Include(p => p.PhotoStories)
                            .Include(s => s.Ratings)
                            .SingleOrDefaultAsync(s => s.StoryName.Replace(" ","").Trim().ToLower() == storyName.Replace(" ","").Trim().ToLower());
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


        public async Task<StoryChapter> GetStoryChapterById(int id)
        {
            return await _context.StoryChapters
                            .Include(p => p.Published)
                            .Where(c => c.Id == id)
                            .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<StoryChapter>> GetStoryChapterByStoryId(int id,bool published = false)
        {
            if(!published){
                return await _context.StoryChapters
                            .Include(c => c.Published)
                            .Where(c => c.StoryId == id)
                            .OrderByDescending(c => c.Order)
                            .ToListAsync();
            }
                    
            return await _context.StoryChapters
                            .Include(c => c.Published)
                            .Where(c => c.StoryId == id && c.Published != null)
                            .OrderByDescending(c => c.Order)
                            .ToListAsync();
        }

        public Task<IEnumerable<Story>> GetStoryAsync()
        {
            throw new System.NotImplementedException();
        }

      

        public async Task<PagedList<StoryDto>> GetStoriesAsync(StoryParams storyParams)
        {
            var query = _context.Stories.AsQueryable();
            if(storyParams.Genre != ""){
                query = query.Where(s => s.Genre == storyParams.Genre);
            }
            if(storyParams.StoryType !=""){
                query =query.Where(s => s.Type == storyParams.StoryType);
            }
            // query = query.Where(a => a.UserName == storyParams.Author);
            query = storyParams.OrderBy switch
            {
                "created" => query.OrderByDescending( s => s.Created),
                "rating" => query.OrderByDescending(s => s.Rating),
                "views" => query.OrderByDescending(s => s.ViewCount.Count),
                _ => query.OrderBy(s=>s.Rating)
            };
          
            // var pro = query.ProjectTo<StoryDto>(configuration).AsNoTracking();
            // var test = _mapper.ProjectTo<StoryDto>(query);
            return await PagedList<StoryDto>.CreateAsync(query.ProjectTo<StoryDto>(_mapper.ConfigurationProvider).AsNoTracking(),
                    storyParams.PageNumber,storyParams.PageSize);

        }
        public async Task<PagedList<StoryDto>> GetAuthorStory(AuthorStoryParams authorStoryParams)
        {
            var query = _context.Stories.AsQueryable();
            if(authorStoryParams.AuthorName != null){
                query = query.Where(a => a.UserName == authorStoryParams.AuthorName);             
            }
            return await PagedList<StoryDto>.CreateAsync(query.ProjectTo<StoryDto>(
                _mapper.ConfigurationProvider).AsNoTracking(),
                authorStoryParams.PageNumber,authorStoryParams.PageSize); 
        }
        public async Task<Rating> GetYouRate(int storyId, int userId)
        {
            return await _context.Ratings
                        .Where(s => s.StoryRatedId == storyId 
                         && s.UserRatedId == userId)
                        .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<StoryChapter>> GetStoryChapterByStoryName(string storyName)
        {
            return await  _context.StoryChapters
                            .Include(c => c.Published)
                            .Include(c => c.Story)
                                .ThenInclude(c=> c.Author).ThenInclude(c=>c.Photos)
                            .Where(c => c.Story.StoryName.Replace(" ","").Trim().ToLower() == storyName.Replace(" ","").Trim().ToLower()
                                &&  c.Published != null)
                            .OrderBy(c => c.Order)
                            .ToListAsync();          
        }
        public async Task<IEnumerable<StoryChapter>> GetStoryChapterByStoryNameTake(string storyName,int countSize,int pageSize)
        {
            return await  _context.StoryChapters
                            .Include(c => c.Published)
                            .Include(c => c.Story)
                                .ThenInclude(c=> c.Author).ThenInclude(c=>c.Photos)
                            .Where(c => c.Story.StoryName.Replace(" ","").Trim().ToLower() == storyName.Replace(" ","").Trim().ToLower()
                                &&  c.Published != null)
                            .OrderBy(c => c.Order)
                            .Skip(countSize)
                            .Take(pageSize)
                            .ToListAsync(); 
        }
        public void AddComment(StoryComment storyComment)
        {
            _context.StoryComments.Add(storyComment);
        }

        // public async Task<IEnumerable<StoryComment>> GetStoryComments(string storyName)
        // {
        //     return await _context.StoryComments
        //             .Include(s=> s.Story)
        //             .Include(s=>s.UserPost)
        //             .ThenInclude(s=>s.Photos)
        //             .Where(c => c.Story.StoryName.Replace(" ","").Trim().ToLower() == storyName.Replace(" ","").Trim().ToLower())
        //             .OrderByDescending(s => s.Created)
        //             .ToListAsync();
        // }
        public async Task<IEnumerable<StoryCommentDto>> GetStoryComments(string storyName)
        {
            return await _context.StoryComments
                    .Include(s=> s.Story)
                    .Include(s=>s.UserPost)
                    .ThenInclude(s=>s.Photos)
                    .Where(c => c.Story.StoryName.Replace(" ","").Trim().ToLower() == storyName.Replace(" ","").Trim().ToLower())
                    .OrderByDescending(s => s.Created)
                    .ProjectTo<StoryCommentDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();
        }
        public void DeletStoryComment(StoryComment storyComment)
        {
            _context.StoryComments.Remove(storyComment);
        }

        public async Task<StoryComment> GetStoryCommentById(int id)
        {
            return await _context.StoryComments
                .Include(u => u.UserPost)
                .Include(u => u.Story)
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Activities> GetLikedComment(int commentId, int userId)
        {
            return await _context.Activities
            .SingleOrDefaultAsync(x => x.UserActiveId == userId && x.ParentId == commentId);
        }

        public void DeleteLikeComment(Activities activities)
        {
            _context.Activities.Remove(activities);
        }

        public async Task<IEnumerable<StoryChapter>> GetNewChaper(int take)
        {
            return   await  _context.StoryChapters
                             .Include(c => c.Published)
                            .Include(c => c.Story)
                                .ThenInclude(c=> c.Author).ThenInclude(c=>c.Photos)
                            .OrderBy(s => s.Published.Created)
                            .Take(take)
                            .ToListAsync();
        }

        Task<StoryChapter> IStoryRepository.GetLastChapterByStoryName(string storyName)
        {
            throw new NotImplementedException();
        }
    }
}