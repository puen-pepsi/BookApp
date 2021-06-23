using System.Threading.Tasks;
using API.Interfaces;
using AutoMapper;

namespace API.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public UnitOfWork(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IUserRepository UserRepository => new UserRepository(_context, _mapper);

        public IMessageRepository MessageRepository => new MessageRepository(_context, _mapper);

        public ILikesRepository LikesRepository => new LikesRepository(_context);

        public IStoryRepository StoryRepository => new StoryRepository(_context,_mapper);

        public IRepository Repository => new Repository<DataContext>(_context);

        public IPhotoRepository PhotoRepository => new PhotoRepository(_context);

        public ILikeStoryRepository LikeStoryRepository => new LikeStoryRepository(_context);

        public IHistoryRepository HistoryRepository =>  new HistoryRepository(_context,_mapper);

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