using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly DataContext _context;
        public PhotoRepository(DataContext context)
        {
            _context = context;

        }
        public async Task<IEnumerable<PhotoStory>> GetPhotos(int storyId)
        {
            return await _context.PhotoStories
                .Where(p => p.StoryId == storyId)
                .ToListAsync();
        }
    }
}