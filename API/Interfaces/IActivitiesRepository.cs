using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IActivitiesRepository
    {
         void AddActivities(Activities activities);
         void AddRank(Rank rank);
         void AddRecievePoint(RecievePoint recievePoint);
         void AddActivitiesPoint(ActivitiesPoint activitiesPoint);
         Task<Activities> GetActivities(int id);
         Task<ActivitiesPoint> GetPoint(ActivitiesType type);
         Task<IEnumerable<RecievePoint>> GetListPoint(int userId);
         Task<IEnumerable<RecievePoint>> GetTotalPoint(int userId);
         Task<IEnumerable<Rank>> GetAllRank();
    }
}