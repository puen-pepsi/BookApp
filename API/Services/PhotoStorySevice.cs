using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Http;

namespace API.Services
{
    public class PhotoStorySevice : IPhotoStoryService
    {
        private readonly IPhotoStorage _photoStorage;
        private readonly IUnitOfWork _unitOfWork;
        public PhotoStorySevice(IUnitOfWork unitOfWork,IPhotoStorage photoStorage)
        {
            _unitOfWork = unitOfWork;
            _photoStorage = photoStorage;
        }
        public async Task<PhotoStory> UploadPhoto(Story story, IFormFile file, string uploadsFolderPath)
        {
            var fileName = await _photoStorage.StorePhoto(uploadsFolderPath, file);

            var photo = new PhotoStory { Url = fileName };
            story.PhotoStories.Add(photo);
            if (await _unitOfWork.Complete()) return photo;

            return photo;
        }
    }
}