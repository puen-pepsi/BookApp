using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CommentsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CommentsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;

        }
        [HttpGet("{storyName}")]
        public async Task<ActionResult<IEnumerable<StoryCommentDto>>> GetCommentsStory(string storyName)
        {
            var comments = await _unitOfWork.StoryRepository.GetStoryComments(storyName);
            if(comments==null)return NotFound();
            // _mapper.Map<IEnumerable<StoryComment>,IEnumerable<StoryCommentDto>>(comments)
            return Ok(comments);
        }
        [HttpPost("{storyName}")]
        public async Task<ActionResult<StoryCommentDto>> CreateComment([FromBody] StoryComment storyComment,string storyName)
        {
            if(!ModelState.IsValid){
                return BadRequest();
            }
            var story = await _unitOfWork.StoryRepository.GetStoryByName(storyName);
            if(story == null)
                return NotFound();
            storyComment.UserPostId = User.GetUserId();
            storyComment.ParentId = storyComment.ParentId;
            story.PostComments.Add(storyComment);
            if(await _unitOfWork.Complete()){
                // var commentreturn = _mapper.Map<StoryCommentDto>(storyComment);
                return Ok(_mapper.Map<StoryCommentDto>(storyComment));
            }
            return BadRequest("Problem create story");
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteComment(int id)
        {
            var username = User.GetUsername();
            var comment = await _unitOfWork.StoryRepository.GetStoryCommentById(id);
            _unitOfWork.StoryRepository.DeletStoryComment(comment);
            if(await _unitOfWork.Complete())return Ok();
            return BadRequest("Problem deleting the comment");
        }
        [Route("AddLiked/{commentId}")]
        [HttpPost]
        public async Task<ActionResult<StoryCommentDto>> AddLiked(int commentId)
        {
            var userId = User.GetUserId();
            var comment = await _unitOfWork.StoryRepository.GetStoryCommentById(commentId);
            var existliked = await _unitOfWork.StoryRepository.GetLikedComment(commentId,userId);
            if(existliked != null){
                _unitOfWork.StoryRepository.DeleteLikeComment(existliked);
            }else{
                var currentUser = await _unitOfWork.UserRepository.GetUserByIdAsync(userId);
                var userLiked = new LikeComment{
                    UserLikeComment = currentUser,
                    UserLikeCommentId  = userId,
                    ParentId = commentId
                };
                comment.Liked.Add(userLiked); 
            }
            
            if( await _unitOfWork.Complete()){
                var commentToReturn =  _mapper.Map<StoryCommentDto>(comment);
                return Ok(commentToReturn);
            }
            return BadRequest("Problem like chapter");
        }
    }
}