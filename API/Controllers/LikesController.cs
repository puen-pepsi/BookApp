using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // [Authorize]
    public class LikesController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public LikesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost("{username}")]
        public async Task<ActionResult> AddLike(string username)
        {
            var sourceUserId = User.GetUserId();
            var likedUser = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);
            var sourceUser = await _unitOfWork.LikesRepository.GetUserWithLikes(sourceUserId);

            if (likedUser == null) return NotFound();

            if (sourceUser.UserName == username) return BadRequest("You cannot like yourself");

            var userLike = await _unitOfWork.LikesRepository.GetUserLike(sourceUserId, likedUser.Id);

            if (userLike != null) return BadRequest("You already like this user");

            userLike = new UserLike
            {
                SourceUserId = sourceUserId,
                LikedUserId = likedUser.Id
            };

            sourceUser.LikedUsers.Add(userLike);

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Failed to like user");
        }
        [HttpDelete("{username}")]
        public async Task<ActionResult> unlike(string username)
        {
            var sourceUserId = User.GetUserId();
            var unlikedUser = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);
            var sourceUser = await _unitOfWork.LikesRepository.GetUserWithLikes(sourceUserId);

            if (unlikedUser == null) return NotFound();

            if (sourceUser.UserName == username) return BadRequest("You cannot like yourself");

            var userUnLike = await _unitOfWork.LikesRepository.GetUserLike(sourceUserId, unlikedUser.Id);

            if (userUnLike == null) return BadRequest("You already unlike this user");
            _unitOfWork.LikesRepository.DeleteMemberLike(userUnLike);
            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Failed to unlike user");
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LikeDto>>> GetUserLikes([FromQuery] LikesParams likesParams)
        {
            likesParams.UserId = User.GetUserId();
            var users = await _unitOfWork.LikesRepository.GetUserLikes(likesParams);

            Response.AddPaginationHeader(users.CurrentPage,
                users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(users);
        }
        [HttpGet("{memberid}")]
        public async Task<ActionResult<MemberLikedDto>> GetUserLike(int memberid)
        {
            var userId = User.GetUserId();
            if(userId == 0)return Ok(null);
            var Liked = await _unitOfWork.LikesRepository.GetUserLike(userId,memberid);
            if(Liked == null){
                    return Ok(null);
            }
            var userliked = new MemberLikedDto{
                MemberId = Liked.LikedUserId
            };
            return Ok(userliked);
        }
    }
}