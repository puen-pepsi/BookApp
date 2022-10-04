using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LikeStoriesController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public LikeStoriesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost("{storyname}")]
        public async Task<ActionResult> AddLikeStory(string storyname)
        {
            var sourceUserId = User.GetUserId();
            var likedStory = await _unitOfWork.StoryRepository.GetStoryByName(storyname,false);
            var sourceUser = await _unitOfWork.LikeStoryRepository.GetStoryWithLikeStory(sourceUserId);
            //check liked
            if(likedStory == null)return NotFound();
            //if(sourceUser.StoryName == storyname) return BadRequest("This story Liked");

            var userLikeStory = await _unitOfWork.LikeStoryRepository.GetUserLikeStory(sourceUserId,likedStory.Id);
            if( userLikeStory != null ) return BadRequest("You already follow this story");

            userLikeStory = new UserStory
            {
                SourceUserId = sourceUserId,
                LikedStoryId = likedStory.Id
            };
            sourceUser.LikedStoryByUsers.Add(userLikeStory);
            if(await _unitOfWork.Complete()) return Ok();
            return BadRequest("Failed to like story");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StoryDto>>> GetStorylikes([FromQuery] LikeStoryParams likeStoryParams)
        {
            likeStoryParams.UserId = User.GetUserId();
            var storylike = await  _unitOfWork.LikeStoryRepository.GetStoryLikes(likeStoryParams);

            Response.AddPaginationHeader(storylike.CurrentPage,
                storylike.PageSize,storylike.TotalCount,storylike.TotalPages);

            return Ok(storylike);
        }

        [HttpGet("{storyId}")]
        public async Task<ActionResult<UserLikedDto>> GetUserStoryLiked( int storyId)
        {
            var userId = User.GetUserId();
            var Liked = await _unitOfWork.LikeStoryRepository.GetUserLikeStory(userId,storyId);
            if(Liked == null){
                    return Ok(null);
            }
            var userliked = new UserLikedDto{
                storyId = Liked.LikedStoryId
            };
            return Ok(userliked);
        }
        [HttpDelete("{storyId}")]
        public async Task<ActionResult> DeleteLikeStory(int storyId){
            var userId = User.GetUserId();
            var likestory = await _unitOfWork.LikeStoryRepository.GetUserLikeStory(userId,storyId);
            _unitOfWork.LikeStoryRepository.DeleteStoryLiked(likestory);
             if(await _unitOfWork.Complete())return Ok();
            return BadRequest("Problem deleting the story liked");
        }

    }
}