using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class TitleRepository : ITitleRepository
    {
        private readonly DataContext _context;
        public TitleRepository(DataContext context)
        {
            _context = context;

        }
        public void AddTitleActive(TitleActive titleActive)
        {
            _context.titleActives.Add(titleActive);
        }

        public void AddTitleName(TitleName titleName)
        {
            _context.titleName.Add(titleName);
        }

        public async Task<TitleActive> GetActiveType(ActivitiesType type,int userId)
        {
            return await _context.titleActives
                                .FirstOrDefaultAsync(t => t.TitleName.Type == type 
                                    && t.AppUserId == userId);
        }

        public async Task<IEnumerable<TitleActive>> GetTitleActives(int userId)
        {
            return await _context.titleActives
                            .Where(t => t.AppUserId == userId)
                            .ToListAsync();
        }

        public async Task<TitleName> GetTitleName(ActivitiesType type)
        {
            return await _context.titleName
                            .FirstOrDefaultAsync(t => t.Type == type);
        }
    }
}