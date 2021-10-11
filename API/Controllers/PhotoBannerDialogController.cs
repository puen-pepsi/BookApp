using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotoBannerDialogController : BaseApiController
    {
                 private readonly IUnitOfWork _unitOfWork;
        public PhotoBannerDialogController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;

        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BannerDialog>>> GetBannerDialog()
        {
            var getBannerDialog = await _unitOfWork.Repository.SelectAll<BannerDialog>();
            return Ok(getBannerDialog);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<BannerDialog>>> GetBannerDialogId(int id)
        {
            var getBannerDialog = await _unitOfWork.Repository.SelectById<BannerDialog>(id);
            return Ok(getBannerDialog);
        }
        [HttpPost]
        public async Task<ActionResult> CreatBannerDialog([FromBody] BannerDialog BannerDialog)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            await _unitOfWork.Repository.CreateAsync<BannerDialog>(BannerDialog);
            // if (await _unitOfWork.Complete())
            // {
            //     return Ok(BannerDialog);
            // }
            return Ok(BannerDialog);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateBannerDialog(int id, [FromBody] BannerDialog BannerDialog)
        {

            var banner = await _unitOfWork.Repository.SelectById<BannerDialog>(id);
            if( banner == null)return NotFound();
                banner.Id = BannerDialog.Id;
                banner.Title = BannerDialog.Title;
                banner.Descriptions = BannerDialog.Descriptions;
                banner.Url = BannerDialog.Url;
                banner.GotoUrl = BannerDialog.GotoUrl;

            await _unitOfWork.Repository.UpdateAsync<BannerDialog>(banner);
            // if (await _unitOfWork.Complete())
            // {

            //     return Ok banner);
            // }
            // return BadRequest("Problem update BannerDialog");
            return Ok(banner);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBannerDialog(int id)
        {
            var delete = await _unitOfWork.Repository.SelectById<BannerDialog>(id);
            if (delete == null)
                return NotFound();
            await _unitOfWork.Repository.DeleteAsync<BannerDialog>(delete);
            // if (await _unitOfWork.Complete())
            //     return Ok(id);

            // return BadRequest("Problem delete BannerDialog");
            return Ok(id);
        }
    }
}