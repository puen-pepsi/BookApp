using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoryRepository : IStoryRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public StoryRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public void AddStory(Story story)
        {
            _context.Stories.Add(story);
        }

        public void AddStoryDetail(StoryDetail storyDetail)
        {
            _context.StoryDetails.Add(storyDetail);
        }

        public Task<IEnumerable<Story>> GetStoryAsync()
        {
            throw new System.NotImplementedException();
        }

        public Task<Story> GetStoryById(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<StoryDetail> GetStoryDetailById(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<StoryDetail>> GetStoryDetailsAsync()
        {
            throw new System.NotImplementedException();
        }

        public void UpdateStory(Story story)
        {
            _context.Entry(story).State = EntityState.Modified;
        }

        public void UpdateStoryDetail(StoryDetail storyDetail)
        {
            _context.Entry(storyDetail).State = EntityState.Modified;
        }
    }
}