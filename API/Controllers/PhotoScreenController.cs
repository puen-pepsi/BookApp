using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotoScreenController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public PhotoScreenController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;

        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhotoScreen>>> GetPhotoScreen()
        {
            var getphotoScreen = await _unitOfWork.ScreenRepository.GetPhotoScreenAll();
            return Ok(getphotoScreen);
        }
        [HttpGet("random")]
        public async Task<ActionResult<PhotoScreen>> RandomScreen()
        {
            var getall = await _unitOfWork.ScreenRepository.GetPhotoScreenAll();
            var getOne = getall.ToArray();

            var generator = new Random();  
            var randomNumber = generator.Next(0, getall.Count()); 
            return Ok(getOne[randomNumber]);
        }
        [HttpPost]
        public async Task<ActionResult> CreatPhotoScreen([FromBody] PhotoScreen photoScreen)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            _unitOfWork.ScreenRepository.AddPhotoScreen(photoScreen);
            if (await _unitOfWork.Complete())
            {
                return Ok(photoScreen);
            }
            return BadRequest("Problem create PhotoScreen");
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePhotoScreen(int id, [FromBody] PhotoScreen photoScreen)
        {

            var screen = await _unitOfWork.ScreenRepository.GetPhotoScreen(id);
            if (screen == null)
                return NotFound();
            screen.Id = photoScreen.Id;
            screen.Title = photoScreen.Title;
            screen.Descriptions = photoScreen.Descriptions;
            screen.Url = photoScreen.Url;
            _unitOfWork.ScreenRepository.UpdatePhotoScreen(screen);
            if (await _unitOfWork.Complete())
            {

                return Ok(screen);
            }
            return BadRequest("Problem update PhotoScreen");
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhotoScreen(int id)
        {
            var delete = await _unitOfWork.ScreenRepository.GetPhotoScreen(id);
            if (delete == null)
                return NotFound();
            _unitOfWork.ScreenRepository.RemovePhotoScreen(delete);
            if (await _unitOfWork.Complete())
                return Ok(id);

            return BadRequest("Problem delete PhotoScreen");
        }
    }
}