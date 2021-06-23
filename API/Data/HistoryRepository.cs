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
    public class HistoryRepository : IHistoryRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public HistoryRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }

        public async Task<AppUser> GetHistoryStoryWithUser(int userId)
        {
            return await _context.Users
                    .Include(x => x.UserHistory)
                    .FirstOrDefaultAsync(x => x.Id == userId);
        }

        public async Task<PagedList<HistoryStoryDto>> GetHistoryUser(HistoryStoryParams historyStoryParams)
        {
            var storyHistory = _context.Stories.AsQueryable();
            var History = _context.HistoryUsers.AsQueryable();
            History = History.Where(History => History.SourceUserId == historyStoryParams.UserId);
            storyHistory = History.Select(History => History.HistoryStory);

            // var historyStory = storyHistory.Select( uHistory => new HistoryStoryDto{
            //     storyId = uHistory.Id,
            //     storyName = uHistory.StoryName,
            //     genre = uHistory.Genre,
            //     username = uHistory.UserName,
            //     imageUrl = uHistory.ImageUrl,
            //     Rating = uHistory.Rating,
            //     TotalRate = uHistory.Ratings.Count,
            // });
            // return await PagedList<HistoryStoryDto>.CreateAsync(historyStory,
            //     historyStoryParams.PageNumber,historyStoryParams.PageSize);
            return await PagedList<HistoryStoryDto>.CreateAsync(storyHistory.ProjectTo<HistoryStoryDto>(_mapper
                .ConfigurationProvider).AsNoTracking(),
                    historyStoryParams.PageNumber, historyStoryParams.PageSize);
        }

        public async Task<UserHistory> GetUserHistory(int sourceUserId, int HistoryStoryId)
        {
            return await _context.HistoryUsers.FindAsync(sourceUserId, HistoryStoryId);
        }
        public void DeleteHistory(UserHistory userHistory)
        {
            _context.HistoryUsers.Remove(userHistory);
        }

        public async Task<UserHistory> GetHistoryForUser(int userId,int historyStoryId)
        {
            return await _context.HistoryUsers.FindAsync(userId,historyStoryId);
        }
    }
}