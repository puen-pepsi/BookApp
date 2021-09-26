using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface ITitleRepository
    {
         void AddTitleName(TitleName titleName);
         void AddTitleActive(TitleActive titleActive);  
         Task<TitleActive> GetActiveType(ActivitiesType type,int userId);  
         Task<TitleName> GetTitleName(ActivitiesType type);    
         Task<IEnumerable<TitleActive>> GetTitleActives(int userId);
    }
}