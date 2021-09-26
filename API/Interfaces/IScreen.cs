using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IScreen
    {
        void AddPhotoScreen(PhotoScreen photoScreen);
        void RemovePhotoScreen(PhotoScreen photoScreen);
        void UpdatePhotoScreen(PhotoScreen PhotoScreen);
        Task<PhotoScreen> GetPhotoScreen(int id);
        Task<IEnumerable<PhotoScreen>> GetPhotoScreenAll();
    }
}