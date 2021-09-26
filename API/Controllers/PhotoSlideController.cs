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
    public class PhotoSlideController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public PhotoSlideController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;

        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhotoSlide>>> GetPhotoSlide()
        {
            var getPhotoslide = await _unitOfWork.Repository.SelectAll<PhotoSlide>();
            return Ok(getPhotoslide);
        }
        [HttpPost]
        public async Task<ActionResult> CreatPhotoslide([FromBody] PhotoSlide photoSlide)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            await _unitOfWork.Repository.CreateAsync<PhotoSlide>(photoSlide);
            // if (await _unitOfWork.Complete())
            // {
            //     return Ok(photoSlide);
            // }
            return Ok(photoSlide);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePhotoslide(int id, [FromBody] PhotoSlide photoSlide)
        {

            var screen = await _unitOfWork.Repository.SelectById<PhotoSlide>(id);
            if (screen == null)
                return NotFound();
            screen.Id = photoSlide.Id;
            screen.Title = photoSlide.Title;
            screen.Descriptions = photoSlide.Descriptions;
            screen.Url = photoSlide.Url;
            screen.GotoUrl = photoSlide.GotoUrl;
            await _unitOfWork.Repository.UpdateAsync<PhotoSlide>(screen);
            // if (await _unitOfWork.Complete())
            // {

            //     return Ok(screen);
            // }
            // return BadRequest("Problem update Photoslide");
            return Ok(screen);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhotoslide(int id)
        {
            var delete = await _unitOfWork.Repository.SelectById<PhotoSlide>(id);
            if (delete == null)
                return NotFound();
            await _unitOfWork.Repository.DeleteAsync<PhotoSlide>(delete);
            // if (await _unitOfWork.Complete())
            //     return Ok(id);

            // return BadRequest("Problem delete PhotoSlide");
            return Ok(id);
        }
    }
}