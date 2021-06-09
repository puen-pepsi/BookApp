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
            story.PostComments.Add(storyComment);
            if(await _unitOfWork.Complete()){
                // var commentreturn = _mapper.Map<StoryCommentDto>(storyComment);
                return Ok(_mapper.Map<StoryCommentDto>(storyComment));
            }
            return BadRequest("Problem create story");
        }
    }
}