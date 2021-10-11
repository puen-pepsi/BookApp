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
    public class PhotoBannerController : BaseApiController
    {
         private readonly IUnitOfWork _unitOfWork;
        public PhotoBannerController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;

        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BannerChapter>>> GetBannerChapter()
        {
            var getBannerChapter = await _unitOfWork.Repository.SelectAll<BannerChapter>();
            return Ok(getBannerChapter);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<BannerChapter>> GetBannerChapterId(int id)
        {
            var getBannerChapter = await _unitOfWork.Repository.SelectById<BannerChapter>(id);
            return Ok(getBannerChapter);
        }
        [HttpPost]
        public async Task<ActionResult> CreatBannerChapter([FromBody] BannerChapter BannerChapter)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            await _unitOfWork.Repository.CreateAsync<BannerChapter>(BannerChapter);
            // if (await _unitOfWork.Complete())
            // {
            //     return Ok(BannerChapter);
            // }
            return Ok(BannerChapter);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateBannerChapter(int id, [FromBody] BannerChapter BannerChapter)
        {

            var banner = await _unitOfWork.Repository.SelectById<BannerChapter>(id);
            if( banner == null)return NotFound();
                banner.Id = BannerChapter.Id;
                banner.Title = BannerChapter.Title;
                banner.Descriptions = BannerChapter.Descriptions;
                banner.Url = BannerChapter.Url;
                banner.GotoUrl = BannerChapter.GotoUrl;

            await _unitOfWork.Repository.UpdateAsync<BannerChapter>(banner);
            // if (await _unitOfWork.Complete())
            // {

            //     return Ok banner);
            // }
            // return BadRequest("Problem update BannerChapter");
            return Ok(banner);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBannerChapter(int id)
        {
            var delete = await _unitOfWork.Repository.SelectById<BannerChapter>(id);
            if (delete == null)
                return NotFound();
            await _unitOfWork.Repository.DeleteAsync<BannerChapter>(delete);
            // if (await _unitOfWork.Complete())
            //     return Ok(id);

            // return BadRequest("Problem delete BannerChapter");
            return Ok(id);
        }
    }
}