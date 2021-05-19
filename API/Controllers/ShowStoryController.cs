using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ShowStoryController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ShowStoryController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;

        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StoryDto>>> GetStory([FromQuery] StoryParams storyParams)
         {
            // storyParams.CurrentUsername = User.GetUsername();
            if (string.IsNullOrEmpty(storyParams.Genre))
                storyParams.Genre = "";
            var story = await _unitOfWork.StoryRepository.GetStoriesAsync(storyParams);
            Response.AddPaginationHeader(story.CurrentPage, story.PageSize,
                    story.TotalCount, story.TotalPages);
            return Ok(story);
        }
        [HttpGet("{storyName}")]
        public async Task<ActionResult<StoryDto>> GetStoryByName(string storyName)
        {
            var story = await _unitOfWork.StoryRepository.GetStoryByName(storyName);
            if (story == null)
                return NotFound();

            return Ok(story);
        }
        // [HttpGet("GetAuthorName")]
        // public async Task<ActionResult<AuthorNameDto> GetAuthorName()
        // {
        //     return
        // } 
    }
}