using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;

namespace API.Controllers
{
    [Route("/api/story/photos")]
    public class PhotosController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public PhotosController(IUnitOfWork unitOfWork,
                IPhotoService photoService,
                IMapper mapper)
        {
            _photoService = photoService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;

        }
        [HttpGet]
        public async Task<IEnumerable<PhotoStoryResource>> GetPhotos(int storyId)
        {
            var photos = await _unitOfWork.PhotoRepository.GetPhotos(storyId);
            return _mapper.Map<IEnumerable<PhotoStory>, IEnumerable<PhotoStoryResource>>(photos);
        }
        [HttpPost("{mwidth}/{mheight}"), DisableRequestSizeLimit]
        public async Task<IActionResult> Upload(int mwidth,int mheight)
        {
            try
            {
                // var file = Request.Form.Files[0];
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();
                var folderName = Path.Combine("Resources", "images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    //var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                    var fullPath = Path.Combine(pathToSave, fileName);
                    //var dbPath = Path.Combine(folderName, fileName);
                    //*edit path to db
                    var dbPath = Path.Combine("images",fileName);
                    // using (var stream = new FileStream(fullPath, FileMode.Create))
                    // {
                    //     file.CopyTo(stream);
                    // }
                    //resize 
                    using(var image =Image.Load(file.OpenReadStream()))
                    {
                        string newSize = ResizeImage(image,mwidth,mheight);
                        string[] aSize = newSize.Split(',');
                        // image.Mutate(h => h.Resize(Convert.ToInt32(aSize[1]),Convert.ToInt32(aSize[0])));
                        image.Mutate(h => h.Resize(Convert.ToInt32(aSize[1]),Convert.ToInt32(aSize[0])));
                        image.Save(fullPath);
                    }
                    //Update Or Create
                    return Ok(new {dbPath});
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
        [HttpPut("{storyId}/{mwidth}/{mheight}")]
        public async Task<ActionResult> UpdatePhoto(int storyId,int mwidth,int mheight)
        {
             try
            {
                // var file = Request.Form.Files[0];
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();
                var folderName = Path.Combine("Resources", "images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    //var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                    var fullPath = Path.Combine(pathToSave, fileName);
                    //var dbPath = Path.Combine(folderName, fileName);
                    var dbPath = Path.Combine("images",fileName);

                    // using (var stream = new FileStream(fullPath, FileMode.Create))
                    // {
                    //     file.CopyTo(stream);
                    // }
                     using(var image =Image.Load(file.OpenReadStream()))
                    {
                        string newSize = ResizeImage(image,mwidth,mheight);
                        string[] aSize = newSize.Split(',');
                        image.Mutate(h => h.Resize(mwidth,mheight));
                        image.Save(fullPath);
                    }
                    //Update Or Create
                    // var storyUpdate = await _unitOfWork.StoryRepository.GetStoryById(storyId,false);
                    // if(storyUpdate == null)
                    //     return NotFound();
                    // storyUpdate.ImageUrl = dbPath;
                    // _mapper.Map<Story>(storyUpdate);
                    // _unitOfWork.StoryRepository.UpdateStory(storyUpdate);
                    // await _unitOfWork.Complete();
                    return Ok(new {dbPath});

                    
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
        [HttpDelete("{fname}")]
        public IActionResult deletefile(string fname)
        {
            var folderName = Path.Combine("Resources", "images");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            var fileToDelete = Path.Combine(pathToSave,fname);
            string _imageToBeDeleted = fileToDelete;
            if ((System.IO.File.Exists(_imageToBeDeleted)))
            {
                System.IO.File.Delete(_imageToBeDeleted);
            }
            return Ok(fname);
        }
        public string ResizeImage (Image img,int maxWidth,int maxHeight)
        {
            if(img.Width > maxWidth || img.Height > maxHeight){
                double widthRatio = (double)img.Width/(double)maxWidth;
                double heightRatio = (double)img.Height/(double)maxHeight;
                double ratio = Math.Max(widthRatio,heightRatio);
                int newWidth = (int)(img.Width/ratio);
                int newHeight =(int)(img.Height/ratio);
                return newHeight.ToString()+","+newWidth.ToString();
            }
            else
            {
                 return img.Height.ToString()+","+img.Width.ToString();   
            }
        }
        // [HttpPost]
        // public async Task<IActionResult> Upload(int storyId,FormFile file)
        // {
        //     var story = await _unitOfWork.StoryRepository.GetStoryById(storyId, true);
        //     if (story == null)
        //         return NotFound();
        //     // // if (file == null) return BadRequest("Null file");
        //     // // if (file.Length == 0) return BadRequest("Empty file");
        //     // // if (file.Length > _photoSettings.MaxBytes) return BadRequest("Max file size exceeded");
        //     // // if (!_photoSettings.IsSupported(file.FileName)) return BadRequest("Invalid file type.");


        //     var uploadsFolderPath = Path.Combine(_host.WebRootPath, "uploads");
        //     if(!Directory.Exists(uploadsFolderPath))
        //         Directory.CreateDirectory(uploadsFolderPath);

        //     var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
        //     var filePath = Path.Combine(uploadsFolderPath,fileName);

        //     using (var stream = new FileStream(filePath,FileMode.Create))
        //     {
        //         file.CopyTo(stream);
        //     }
        //     // var photo = await _photoStoryService.UploadPhoto(story,file,uploadsFolderPath);
        //     var photoStory = new PhotoStory{FileName=fileName};
        //     story.PhotoStories.Add(photoStory);
        //     await _unitOfWork.Complete();
        //     return Ok(_mapper.Map<PhotoStory,PhotoStoryResource>(photoStory));
        // }
        // [HttpPost]
        // public async Task<ActionResult<PhotoDto>> AddPhoto(int storyId, IFormFile file)
        // {
        //     var story = await _unitOfWork.StoryRepository.GetStoryById(storyId);
        //     if (story == null)
        //         return NotFound();
        //     var result = await _photoService.AddPhotoAsync(file);

        //     if (result.Error != null) return BadRequest(result.Error.Message);

        //     var photoStory = new PhotoStory
        //     {
        //         Url = result.SecureUrl.AbsoluteUri,
        //         PublicId = result.PublicId
        //     };
        //     if (story.PhotoStories.Count == 0)
        //     {
        //         photoStory.IsMain = true;
        //     }
        //     story.PhotoStories.Add(photoStory);

        //     if (await _unitOfWork.Complete())
        //     {
        //         return Ok(_mapper.Map<PhotoStory,PhotoStoryResource>(photoStory));
        //     }


        //     return BadRequest("Problem addding photo");
        // }
    }
}