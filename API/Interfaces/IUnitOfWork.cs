using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository {get; }
        IMessageRepository MessageRepository {get;}
        ILikesRepository LikesRepository {get; }

        IStoryRepository StoryRepository {get; }

        IRepository Repository {get;}
        Task<bool> Complete();
        bool HasChanges();
    }
}