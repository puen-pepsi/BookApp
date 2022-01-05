using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace API.Controllers
{
    public class ImageController : BaseApiController
    {
        private readonly IConfiguration _config;
        public ImageController(IConfiguration config)
        {
            _config = config;

        }
        [HttpPost, DisableRequestSizeLimit]
        public async Task<Object> ImageUpload()
        {
            var formCollection = await Request.ReadFormAsync();
            var file = formCollection.Files.First();

            var folderName = Path.Combine("Resources", "images");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            if (file.Length == 0)
                return await Task.FromResult(new { error = new { message = "no file hes sent" } });

            if (!Directory.Exists(pathToSave))
                return await Task.FromResult(new { error = new { message = "Folder does not exist" } });
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var fullPath = Path.Combine(pathToSave, fileName);
            var dbPath = Path.Combine("images/", fileName);
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                file.CopyTo(stream);
            }
            
            //string imageUrl = "https://localhost:5001/" + dbPath;
            string imageUrl = _config["ApiUrl"] + dbPath;
            return await Task.FromResult(new { Url = imageUrl });

        }
    }
}