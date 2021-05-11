using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace API.Interfaces
{
    public interface IPhotoStorage
    {
        Task<string> StorePhoto(string uploadsFolderPath, IFormFile file);
    }
}