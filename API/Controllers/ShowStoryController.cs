using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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
        [HttpGet("getviews")]
        public async Task<ActionResult<IEnumerable<StoryViewsDto>>> getviews([FromQuery] ViewsParams viewsParams)
        {
            var views = await _unitOfWork.StoryRepository.GetViewsQuery(viewsParams);
            return Ok(views);
        }
        [AllowAnonymous]
        [HttpGet("getStoryLazyLoad/{currentItem}/{takeSize}/{storyType}")]
        public async Task<ActionResult<IEnumerable<StoryDto>>> getStoryLazyLoad(int currentItem,int takeSize,string storyType)
        {
            var story = await _unitOfWork.StoryRepository
                    .GetStoriesAsynclazyload(currentItem,takeSize,storyType);
             //var storyreturn = _mapper.Map<IEnumerable<StoryDto>>(story);  

            //return Ok(storyreturn);
            return Ok(story);
        }
        [HttpGet("getStoryRandom/{takesize}")]
        public async Task<ActionResult<IEnumerable<StoryDto>>> getStoryRandom(int takesize)
        {
            var story = await _unitOfWork.StoryRepository
                    .GetStoriesAsyncRandom(takesize);
            return Ok(story);
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StoryDto>>> GetStory([FromQuery] StoryParams storyParams)
         {
            // storyParams.CurrentUsername = User.GetUsername();
            if (string.IsNullOrEmpty(storyParams.Genre))
                storyParams.Genre = "";
            if (string.IsNullOrEmpty(storyParams.StoryType))
                storyParams.StoryType = "";
            if (string.IsNullOrEmpty(storyParams.Language))
                storyParams.Language ="";
            if (string.IsNullOrEmpty(storyParams.Search))
                storyParams.Search="";
            if(!string.IsNullOrEmpty(storyParams.Search)){
                char c = storyParams.Search[0];
                if(c.Equals('#')){
                    string search = storyParams.Search;
                    storyParams.Search = search.Substring(1);
                }
                  
                 
            }
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
            var userId = User.GetUserId();
            var story = await _unitOfWork.StoryRepository.GetStoryByName(storyName);
            if (story == null)
                return NotFound();
            //story.Views++;
            var viewHit = new View{
                UserViewId = userId,
                StoryViewId = story.Id
            };
            story.ViewCount.Add(viewHit);
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