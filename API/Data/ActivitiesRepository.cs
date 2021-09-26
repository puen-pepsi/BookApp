using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ActivitiesRepository : IActivitiesRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ActivitiesRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }

        public void AddActivities(Activities activities)
        {
            _context.Activities.Add(activities);
        }

        public void AddActivitiesPoint(ActivitiesPoint activitiesPoint)
        {
            _context.ActivitiesPoints.Add(activitiesPoint);
        }

        public void AddRank(Rank rank)
        {
            _context.Ranks.Add(rank);
        }

        public void AddRecievePoint(RecievePoint recievePoint)
        {
            _context.RecievePoints.Add(recievePoint);
        }

        public async Task<Activities> GetActivities(int id)
        {
            return await _context.Activities.FindAsync(id);
        }

        public async Task<IEnumerable<Activities>> GetActivitiesUser(int userId)
        {
            return await _context.Activities
                            .Where(a => a.UserActiveId == userId)
                            .OrderBy(a => a.ActivitiesCreate)
                            .ToListAsync();
        }

        public async Task<IEnumerable<Rank>> GetAllRank()
        {
            return await _context.Ranks.ToListAsync();

        }

        public async Task<IEnumerable<RecievePoint>> GetListPoint(int userId)
        {
            return  await _context.RecievePoints
                        .Include( r => r.Activities)
                            .ThenInclude(r => r.UserActive)
                        .Include( r => r.Activities)
                            .ThenInclude(r => r.story)
                        .Where(r => r.RecievePointUserId == userId)
                        .OrderByDescending(r => r.Activities.ActivitiesCreate)
                        .ToListAsync();
        }

        public async Task<ActivitiesPoint> GetPoint(ActivitiesType type)
        {
            return await _context.ActivitiesPoints.FirstOrDefaultAsync(a => a.Type == type);
        }

        public async Task<IEnumerable<RecievePoint>> GetTotalPoint(int userId)
        {
            return  await _context.RecievePoints
                        .Where(r => r.RecievePointUserId == userId)
                        .ToListAsync();
        }
    }
}