using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ScreenRepository : IScreen
    {
        private readonly DataContext _context;
        public ScreenRepository(DataContext context)
        {
            _context = context;

        }
        public void AddPhotoScreen(PhotoScreen photoScreen)
        {
            _context.PhotoScreens.Add(photoScreen);
        }
        public void UpdatePhotoScreen(PhotoScreen photoScreen)
        {
             _context.Entry(photoScreen).State = EntityState.Modified;
        }

        public async Task<PhotoScreen> GetPhotoScreen(int id)
        {
            return await _context.PhotoScreens.FindAsync(id);
        }

        public async Task<IEnumerable<PhotoScreen>> GetPhotoScreenAll()
        {
            return await _context.PhotoScreens.ToListAsync();
        }

        public void RemovePhotoScreen(PhotoScreen photoScreen)
        {
             _context.PhotoScreens.Remove(photoScreen);
        }
    }
}