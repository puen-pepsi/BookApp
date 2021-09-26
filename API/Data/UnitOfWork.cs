using System.Threading.Tasks;
using API.Interfaces;
using AutoMapper;
using Microsoft.Extensions.Configuration;

namespace API.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IConfiguration _config;
        public UnitOfWork(DataContext context, IMapper mapper, IConfiguration config)
        {
            _config = config;
            _context = context;
            _mapper = mapper;
        }

        public IUserRepository UserRepository => new UserRepository(_context, _mapper);

        public IMessageRepository MessageRepository => new MessageRepository(_context, _mapper);

        public ILikesRepository LikesRepository => new LikesRepository(_context);

        public IStoryRepository StoryRepository => new StoryRepository(_context, _mapper);

        public IRepository Repository => new Repository<DataContext>(_context);

        public IPhotoRepository PhotoRepository => new PhotoRepository(_context);

        public ILikeStoryRepository LikeStoryRepository => new LikeStoryRepository(_context,_config);

        public IHistoryRepository HistoryRepository => new HistoryRepository(_context, _mapper,_config);

        public IChatMessageRepository ChatMessageRepository =>  new ChatMessageRepository(_context,_mapper);

        public INewsRepository NewsRepository =>  new NewsRepository(_context);

        public IActivitiesRepository ActivitiesRepository =>  new ActivitiesRepository(_context,_mapper);

        public ITitleRepository TitleRepository =>  new TitleRepository(_context);

        public IScreen ScreenRepository =>  new ScreenRepository(_context);

        public ITagRepository TagRepository =>  new TagRepository(_context,_mapper);

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }
    }
}