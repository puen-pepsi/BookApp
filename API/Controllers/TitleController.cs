using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class TitleController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public TitleController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;

        }
        [HttpGet("{type}")]
        public async Task<ActionResult<TitleActive>> GetActiveType(ActivitiesType type)
        {
            var userId = User.GetUserId();
            var activetype = await _unitOfWork.TitleRepository.GetActiveType(type,userId);
            if(activetype != null )return Ok(activetype);
            return Ok();
        }
        [HttpPost("{ranking}")]
        public async Task<ActionResult> Activities(string ranking,[FromBody] TitleActive titleActive)
        {
            if(!ModelState.IsValid){
                return BadRequest();
            }
            if(!(titleActive.AppUserId > 0)){
              titleActive.AppUserId = User.GetUserId();  
            }
            
            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(titleActive.AppUserId);
            var title = user.titleAcitive.FirstOrDefault(x => x.Type == titleActive.Type 
                                    && x.Type != ActivitiesType.Ranking);
            if( title != null )return NoContent();
            var ActiveType = await _unitOfWork.TitleRepository.GetTitleName(titleActive.Type);
            //var story = await _unitOfWork.StoryRepository.GetStoryByName(storyName);
            //activities.story = story;
            //activities.UserActiveId = userid;
            var titleIsMain = user.titleAcitive.FirstOrDefault(x => x.IsMain);
            if(titleIsMain != null)titleIsMain.IsMain =false;
            var getTitle = new TitleActive{
                AppUserId = user.Id,
                AppUser = user,
                TitleNameId = ActiveType.Id,
                TitleName = ActiveType,
                Name = ActiveType.Name,
                IsMain = true,
                Type = titleActive.Type
            };
            // if(user.titleAcitive.Count == 0){
            //     getTitle.IsMain = true;
            // }
            if(titleActive.Type == ActivitiesType.Ranking){
                getTitle.Name = ActiveType.Name + ranking;
            }
            if(titleActive.Type == ActivitiesType.GiveTitle){
                getTitle.Name = ranking;
            }
            user.titleAcitive.Add(getTitle);
            if(!await _unitOfWork.Complete()) return BadRequest("Problem Add Title");
              
            return Ok();
        }
        
    }
}