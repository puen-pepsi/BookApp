using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class NewsRepository : INewsRepository
    {
        private readonly DataContext _context;
        public NewsRepository(DataContext context)
        {
            _context = context;

        }
        public void AddNews(News news)
        {
            _context.Newses.Add(news);
        }

        public async Task<News> GetNews(int id)
        {
            return await _context.Newses
                        .Include(x => x.UserNews)
                            .ThenInclude(x => x.Photos)
                        .FirstOrDefaultAsync(x => x.id == id);
        }

        public async Task<IEnumerable<News>> GetNewsList(int tcount)
        {
            return  await _context.Newses
                        .OrderByDescending(n => n.NewsCreated)
                        .Take(tcount)
                        .ToListAsync();
        }

        public async Task<IEnumerable<News>> GetNewsLazyLoad(int current, int takesize)
        {
            return await _context.Newses
                        .Include(x=>x.UserNews)
                            .ThenInclude(x => x.Photos)
                        .OrderByDescending(x => x.NewsCreated)
                        .Skip(current)
                        .Take(takesize)
                        .ToListAsync();
        }
        public async Task<IEnumerable<News>> GetNewsAll()
        {
            return  await _context.Newses
                        .Include(x => x.UserNews)
                            .ThenInclude(x => x.Photos)
                        .OrderByDescending(n => n.NewsCreated)
                        .ToListAsync();
        }
        public void RemoveNews(News news)
        {
            _context.Newses.Remove(news);
        }

        public void UpdateNews(News news)
        {
            _context.Entry(news).State = EntityState.Modified;
        }
        
        public void DeleteNews(News news)
        {
            _context.Newses.Remove(news);
        }

    }
}