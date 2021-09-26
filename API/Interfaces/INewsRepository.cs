using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface INewsRepository
    {
        void AddNews(News news);
        void RemoveNews(News news);
        void UpdateNews(News news);
        Task<News> GetNews(int id);
        Task<IEnumerable<News>> GetNewsList(int tcount);
        Task<IEnumerable<News>> GetNewsAll();
        Task<IEnumerable<News>> GetNewsLazyLoad(int current,int takesize);
        void DeleteNews(News news);

    }
}