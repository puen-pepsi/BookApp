using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IHistoryRepository
    {
         Task<UserHistory> GetUserHistory(int sourceUserId,int HistoryStoryId);
         Task<AppUser> GetHistoryStoryWithUser(int userId);
         Task<PagedList<HistoryStoryDto>> GetHistoryUser(HistoryStoryParams historyStoryParams);
         Task<UserHistory> GetHistoryForUser(int userId,int historyStoryId);
         void DeleteHistory(UserHistory userHistory);


    }
}