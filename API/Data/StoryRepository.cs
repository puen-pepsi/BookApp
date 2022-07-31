using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
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

        public StoryRepository()
        {
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
                //.Include(s => s.Ratings)
                .Include(s=> s.Author)
                    .ThenInclude(a => a.Photos)
                //.Include(s => s.ViewCount) 
                .Include(s => s.Chapters)
                    .ThenInclude(c => c.Published)
                .Where(x => x.UserName == username)
                .ToListAsync();
        }
        public async Task<Story> GetStoryByName(string storyName,bool include)
        {
            //newedit
             if(include){
                    var story = await _context.Stories
                            .Include(s => s.Chapters)
                                .ThenInclude(sc => sc.Published)
                            // .Include(s=> s.Author)
                            //     .ThenInclude(s => s.Photos)

                            // .Include(s => s.Author)
                            //     .ThenInclude(s => s.titleAcitive)  
                            // .Include( s => s.Author)
                            //     .ThenInclude( s => s.recievePoints)
                            // .Include(p => p.PhotoStories)
                            
                            // .Include(s => s.ViewCount)
                            // .Include(s => s.Ratings)
                            .SingleOrDefaultAsync(s => s.StoryName.Replace(" ","").Trim().ToLower() == storyName.Replace(" ","").Trim().ToLower());
                    story.Author = await _context.Users
                                        .Include(s => s.Photos)
                                        .FirstOrDefaultAsync(x => x.Id == story.AuthorId);
                    story.Ratings = await _context.Ratings.Where( x => x.StoryRatedId == story.Id).ToListAsync();
                    story.ViewCount = await _context.Views
                                    .Where ( v => v.StoryViewId == story.Id)
                                    .ToListAsync();
                    story.Chapters = await _context.StoryChapters.Include(p => p.Published)
                                    .Where( c => c.StoryId == story.Id && c.Order > 0)
                                    .ToListAsync();
                    return story;
                    // return await _context.Stories
                    //                     .Where(s => s.StoryName.Replace(" ","").Trim().ToLower() == storyName.Replace(" ","").Trim().ToLower())
                    //                     .Include(c => c.Chapters).ThenInclude( p=>p.Published)
                    //                     .Include(s => s.ViewCount)
                    //                     .Include( a => a.Author).ThenInclude( p => p.Photos)
                    //                     .Include( r => r.Ratings)
                    //                     .FirstOrDefaultAsync();
             }
             return await _context.Stories.SingleOrDefaultAsync(s => s.StoryName.Replace(" ","").Trim().ToLower() == storyName.Replace(" ","").Trim().ToLower());
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
                            .Include(a => a.LikeChapters)
                                .ThenInclude(a => a.UserActive)
                            .Where(c => c.Id == id)
                            .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<StoryChapter>> GetStoryChapterByStoryId(int id,bool published = false)
        {
            if(!published){
                return await _context.StoryChapters
                            .Include(c => c.Published)
                            .Where(c => c.StoryId == id )
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
        public async Task<IEnumerable<StoryDto>> GetStoriesAsynclazyload(int currentStory,int pageSize,string storyType)
        {
            return await _context.Stories
                            .Include( s =>s.ViewCount)
                            .Include( s => s.Ratings)
                            .Include( s => s.Author)
                            .ThenInclude( s => s.Photos)
                            .Include( s => s.Chapters)
                            .ThenInclude(s => s.Published)
                            .Where( s => s.Type == storyType)
                            .OrderByDescending(s => s.ViewCount.Count)
                            .Skip(currentStory)
                            .Take(pageSize)
                            .Select(s => new StoryDto{
                                Genre = s.Genre,
                                ImageUrl = s.ImageUrl,
                                Rating = s.Ratings.Count() == 0 ? 0 : s.Ratings.Average(s => s.Rated),
                                StoryName = s.StoryName,
                                Description = s.Description,
                                UserName = s.Author.KnownAs,
                                UserPhoto = s.Author.Photos.FirstOrDefault(x => x.IsMain).Url,
                                GetState  = s.Created.GetState(s.State),
                                TotalChapter = s.Chapters
                                    .Where(p => p.Published.Created > DateTime.MinValue).Count() == 0? 0: s.Chapters
                                    .Where(p => p.Published.Created > DateTime.MinValue).Count(),
                                Views = s.ViewCount.Count,
                                LastChapterCreate =  s.Chapters.OrderByDescending(x => x.Order).First().Published.Created.ToString()
                            })
                            .ToListAsync();  
        }
         public async Task<IEnumerable<StoryDto>> GetStoriesAsyncRandom(int pageSize)
        {
            var allstory =  await _context.Stories
                            .Include( s =>s.ViewCount)
                            .Include( s => s.Ratings)
                            .Include( s => s.Author)
                            .Include( s => s.Chapters)
                            .Select(s => new StoryDto{
                                Genre = s.Genre,
                                ImageUrl = s.ImageUrl,
                                Rating = s.Ratings.Count() == 0 ? 0 : s.Ratings.Average(s => s.Rated),
                                StoryName = s.StoryName,
                                Description = s.Description,
                                UserName = s.Author.KnownAs,
                                //UserPhoto = s.Author.Photos.FirstOrDefault(x => x.IsMain).Url,
                                //GetState  = s.Created.GetState(s.State),
                                //TotalChapter = s.Chapters
                                //    .Where(p => p.Published.Created > DateTime.MinValue).Count() == 0? 0: s.Chapters
                                //    .Where(p => p.Published.Created > DateTime.MinValue).Count(),
                                //Views = s.ViewCount.Count
                                LastChapterCreate =  s.Chapters.OrderByDescending(x => x.Order).First().Published.Created.ToString()

                            })
                            .ToListAsync();  
            var random = allstory.OrderBy(t => Guid.NewGuid()).Take(pageSize);
            //return _mapper.Map<IEnumerable<StoryDto>>(random);     
            return random;
        }
        public async Task<PagedList<StoryDto>> GetStoriesAsync(StoryParams storyParams)
        {
            var query = _context.Stories.Include(s => s.Ratings).AsQueryable();
            if(storyParams.Genre != "All"){
                query = query.Where(s => s.Genre == storyParams.Genre);
            }
            if(storyParams.Language != "All"){
                query = query.Where(s => s.Language == storyParams.Language);
            }
            if(storyParams.StoryType !=""){
                query =query.Where(s => s.Type == storyParams.StoryType);
            }
            if(storyParams.Search !=""){
                query = query.Where(s => s.StoryName.ToLower().Contains(storyParams.Search) 
                    || s.Tags.ToLower().Contains(storyParams.Search.ToLower())
                    || s.Genre.ToLower().Contains(storyParams.Search.ToLower())
                    || s.Author.KnownAs.ToLower().Contains(storyParams.Search.ToLower()));
            }
            // query = query.Where(a => a.UserName == storyParams.Author);
            
            query = storyParams.OrderBy switch
            {
                "created" => query.OrderByDescending( s => s.Created),
                "rating" => query.OrderByDescending(s => s.Ratings.Average(s => s.Rated))
                    .ThenByDescending( s => s.Ratings.Count()),
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
                            .Include(c => c.LikeChapters)
                                .ThenInclude( c=>c.UserActive)
                            .Where(c => c.Story.StoryName.Replace(" ","").Trim().ToLower() == storyName.Replace(" ","").Trim().ToLower()
                                &&  c.Published != null)
                            .OrderBy(c => c.Order)
                            .ToListAsync();          
        }
        public async Task<IEnumerable<StoryChapter>> GetStoryChapterLazyload(string storyName,int currentChapter,int pageSize)
        {
            return await  _context.StoryChapters
                            .Include(c => c.Published)
                            .Include(c => c.Story)
                                .ThenInclude(c=> c.Author).ThenInclude(c=>c.Photos)
                            .Include(c => c.LikeChapters)
                                .ThenInclude( c=>c.UserActive)
                            .Where(c => c.Story.StoryName.Replace(" ","").Trim().ToLower() == storyName.Replace(" ","").Trim().ToLower()
                                &&  c.Published != null)
                            .OrderBy(c => c.Order)
                            .Skip(currentChapter)
                            .Take(pageSize)
                            .ToListAsync();          

        }
        public async Task<IEnumerable<StoryChapter>> GetStoryChapterLazyloadUp(string storyName,int currentChapter,int pageSize)
        {
            return await  _context.StoryChapters
                            .Include(c => c.Published)
                            .Include(c => c.Story)
                                .ThenInclude(c=> c.Author).ThenInclude(c=>c.Photos)
                            .Include(c => c.LikeChapters)
                                .ThenInclude( c=>c.UserActive)
                            .Where(c => c.Story.StoryName.Replace(" ","").Trim().ToLower() == storyName.Replace(" ","").Trim().ToLower()
                                &&  c.Published != null && c.Order < currentChapter)
                            .OrderByDescending(c => c.Order)
                            .Take(pageSize).Reverse()
                            .ToListAsync();
        }
        public async Task<IEnumerable<StoryChapter>> GetStoryChapterByStoryNameTake(string storyName,int countSize,int pageSize)
        {
            if(pageSize==0){//show all
                return await  _context.StoryChapters
                            .Include(c => c.Published)
                            .Where(c => c.Story.StoryName.Replace(" ","").Trim().ToLower() == storyName.Replace(" ","").Trim().ToLower()
                                &&  c.Published != null)
                            .OrderBy(c => c.Order)
                            .ToListAsync(); 
            }
            return await  _context.StoryChapters
                            .Include(c => c.Published)
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

        public async Task<LikeComment> GetLikedComment(int commentId, int userId)
        {
            return await _context.LikeComments
            .SingleOrDefaultAsync(x => x.UserLikeCommentId == userId && x.ParentId == commentId);
        }
        public async Task<LikeChapter> GetLikedChapter(int chapterId, int userId)
        {
            return await _context.LikeChapters
            .SingleOrDefaultAsync(x => x.UserActiveId == userId && x.ChapterId == chapterId);
        }
        public void DeleteLikeComment(LikeComment likeComment)
        {
            _context.LikeComments.Remove(likeComment);
        }
        public void DeleteLikeChapter(LikeChapter likeChapter)
        {
            _context.LikeChapters.Remove(likeChapter);
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

        public async Task<IEnumerable<StoryViewsDto>> GetViewsQuery(ViewsParams viewsParams)
        {
             DateTime query;
             query = viewsParams.OrderByViews switch
            {
                "weekly" => DateTime.UtcNow.AddDays(-7),
                "monthly" => DateTime.UtcNow.AddMonths(-1),
                _ => DateTime.MinValue
            };
            //novel or manga
            return  await _context.Stories
                    .Select((s) => new StoryViewsDto
                    {
                        // Select from every Patient only the properties you plan to use
                        StoryId = s.Id,
                        StoryName = s.StoryName,
                        AuthorId = s.AuthorId,
                        ImageUrl = s.ImageUrl,
                        Description = s.Description,
                        AuthorName = s.Author.UserName,
                        Views = s.ViewCount.Where(v => v.RateCreated > query).Count(),
                    })
                    .OrderByDescending(v => v.Views)
                    .ToListAsync();

        }

        public async Task<IEnumerable<StoryChapter>> GetStoryChapterByStoryIdNotPublish(int id)
        {
             return await _context.StoryChapters
                            .Include(c => c.Published)
                            .Where(c => c.StoryId == id && c.Published == null)
                            .OrderByDescending(c => c.Order)
                            .ToListAsync();
        }

        public async Task<IEnumerable<StoryChapter>> GetStoryChapterRecent(int currentChapter,int pageSize)
        {
            // DateTime twoweek = DateTime.Now.AddDays(-14);
             return await _context.StoryChapters
                            .Include(c => c.Published)
                            .Include(c => c.Story)
                            .ThenInclude( c => c.Author)
                            .ThenInclude( c => c.Photos)
                            // .Where(c => c.Published != null && c.Published.Created > twoweek )
                            .OrderByDescending(c => c.Published.Created)
                            .Skip(currentChapter)
                            .Take(pageSize)
                            .ToListAsync();
        }
    }
}