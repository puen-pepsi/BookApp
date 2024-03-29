using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository {get; }
        IMessageRepository MessageRepository {get;}
        IChatMessageRepository ChatMessageRepository{get;}
        ILikesRepository LikesRepository {get; }
        ILikeStoryRepository LikeStoryRepository {get;}
        IHistoryRepository HistoryRepository{get;}
        IStoryRepository StoryRepository {get; }
        IRepository Repository {get;}
        IPhotoRepository PhotoRepository {get;}
        INewsRepository NewsRepository {get;}
        Task<bool> Complete();
        bool HasChanges();
    }
}