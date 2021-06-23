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
        [Route("GetStoryAuthor")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StoryDto>>> GetStoryAuthor([FromQuery] AuthorStoryParams authorStoryParams)
        {

            var storyAuthor = await _unitOfWork.StoryRepository.GetAuthorStory(authorStoryParams);
             if(storyAuthor == null)
                return NotFound();
                Response.AddPaginationHeader(storyAuthor.CurrentPage,
                storyAuthor.PageSize, storyAuthor.TotalCount, storyAuthor.TotalPages);
            var storylist = _mapper.Map<IEnumerable<StoryDto>>(storyAuthor);
            return Ok(storylist);
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
            var StoryShow = _mapper.Map<StoryDto>(story);

            return Ok(StoryShow);
        }
        [HttpPut("{storyName}")]
        public async Task<ActionResult<StoryDto>> AddViews(string storyName)
        {
            var story = await _unitOfWork.StoryRepository.GetStoryByName(storyName);
            if (story == null)
                return NotFound();
            story.Views++;
            _unitOfWork.StoryRepository.UpdateStory(story);
            if(await _unitOfWork.Complete()){
                return _mapper.Map<StoryDto>(story);
            }
            return BadRequest("Problem Add Views");
        }
        // [HttpGet("{storyName}/chapters")]
        // public  async Task<ActionResult<StoryChapterDto>> GetStoryChapterByName(string storyName)
        // {
        //     var story = await _unitOfWork.StoryRepository.GetStoryByName(storyName);
        //     if (story == null)
        //         return NotFound();
        //     var StoryShow = _mapper.Map<StoryDto>(story);

        //     return Ok(StoryShow);
        // }
    }
}