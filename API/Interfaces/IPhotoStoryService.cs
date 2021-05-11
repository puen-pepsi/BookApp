using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Http;

namespace API.Interfaces
{
    public interface IPhotoStoryService
    {
        Task<PhotoStory> UploadPhoto(Story story, IFormFile file, string uploadsFolderPath);

    }
}