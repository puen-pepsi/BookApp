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
    public class PhotoSlide2Controller :BaseApiController
    {
         private readonly IUnitOfWork _unitOfWork;
        public PhotoSlide2Controller(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;

        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhotoSlide2>>> GetPhotoSlide()
        {
            var getPhotoslide = await _unitOfWork.Repository.SelectAll<PhotoSlide2>();
            return Ok(getPhotoslide);
        }
        [HttpPost]
        public async Task<ActionResult> CreatPhotoslide([FromBody] PhotoSlide2 photoSlide2)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            await _unitOfWork.Repository.CreateAsync<PhotoSlide2>(photoSlide2);
            // if (await _unitOfWork.Complete())
            // {
            //     return Ok(photoSlide);
            // }
            return Ok(photoSlide2);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePhotoslide(int id, [FromBody] PhotoSlide2 photoSlide2)
        {

            var screen = await _unitOfWork.Repository.SelectById<PhotoSlide2>(id);
            if (screen == null)
                return NotFound();
            screen.Id = photoSlide2.Id;
            screen.Title = photoSlide2.Title;
            screen.Descriptions = photoSlide2.Descriptions;
            screen.Url = photoSlide2.Url;
            screen.GotoUrl = photoSlide2.GotoUrl;
            await _unitOfWork.Repository.UpdateAsync<PhotoSlide2>(screen);
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
            var delete = await _unitOfWork.Repository.SelectById<PhotoSlide2>(id);
            if (delete == null)
                return NotFound();
            await _unitOfWork.Repository.DeleteAsync<PhotoSlide2>(delete);
            // if (await _unitOfWork.Complete())
            //     return Ok(id);

            // return BadRequest("Problem delete PhotoSlide");
            return Ok(id);
        }
    }
}