using API.Interfaces;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using API.DTOs;
using API.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;
using AutoMapper;
using System;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Authorize]
    public class StoryController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public StoryController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StoryDto>>> Get()
        {
            var username = User.GetUsername();
            if(username == null)
                return NotFound();
            var storyUserList = await _unitOfWork.StoryRepository.GetStoryByUserName(username);
             if(storyUserList == null)
                return NotFound();
            var story = _mapper.Map<IEnumerable<StoryDto>>(storyUserList);
            return Ok(story);
        }
        [Route("{id}/{includeRelated}")]
        [HttpGet]
        public async Task<ActionResult<Story>> GetStory(int id,bool includeRelated)
        {
            var storyFromRepo = await _unitOfWork.StoryRepository.GetStoryById(id,includeRelated);
            if(storyFromRepo == null)
                return NotFound();
                
            return Ok(storyFromRepo);
        }
        [HttpGet("{username}",Name="GetStoryByUser")]
        public async Task<ActionResult<IEnumerable<Story>>> GetStoryByUser(string username)
        {
            var userStory = await _unitOfWork.StoryRepository.GetStoryByUserName(username);
            if (userStory == null)
                return NotFound();
            return Ok(userStory);
        }
        [HttpPost]
        public async Task<ActionResult> CreateStory([FromBody] StoryDto storyDto)
        {
            if(!ModelState.IsValid){
                return BadRequest();
            }
            storyDto.UserName= User.GetUsername();
            storyDto.AuthorId = User.GetUserId();
            storyDto.Created = DateTime.UtcNow;
            var createStory = _mapper.Map<Story>(storyDto);

            _unitOfWork.StoryRepository.AddStory(createStory);
            if(await _unitOfWork.Complete()) {          
                if(storyDto.Tags != null){       
                    var Alltag = await _unitOfWork.Repository.SelectAll<Tag>();
                    foreach (string tag in  storyDto.Tags.Split(","))
                    {
                        if(!Alltag.Exists(t=>t.TagName.ToLower().Trim() == tag.ToLower().Trim())){
                            var addTag = new Tag{TagName = tag};
                            await _unitOfWork.Repository.CreateAsync<Tag>(addTag);
                        }
                    }
                }
                var storyToReturn = _mapper.Map<StoryDto>(createStory);
                // return CreatedAtAction("GetStory",new{id = storyToReturn.StoryId},storyToReturn);
                return Ok(storyToReturn);
            }           
            return BadRequest("Problem create story");
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateStory(int id,[FromBody] StoryDto storyDto)
        {

            var storyUpdate = await _unitOfWork.StoryRepository.GetStoryById(id);
            if(storyUpdate == null)
                return NotFound();
            storyDto.Created = storyUpdate.Created;
            storyDto.UserName = storyUpdate.UserName;
            storyDto.AuthorId = storyUpdate.AuthorId;
            _mapper.Map<StoryDto,Story>(storyDto,storyUpdate);
            _unitOfWork.StoryRepository.UpdateStory(storyUpdate);
            if(await _unitOfWork.Complete()){
                
                if(storyDto.Tags != null){
                    var Alltag = await _unitOfWork.Repository.SelectAll<Tag>();
                    foreach (string tag in  storyDto.Tags.Split(","))
                    {
                        if(!Alltag.Exists(t=>t.TagName.ToLower().Trim() == tag.ToLower().Trim())){
                            var addTag = new Tag{TagName = tag};
                            await _unitOfWork.Repository.CreateAsync<Tag>(addTag);
                        }
                    }
                }
                
                var storyToReturn = _mapper.Map<StoryDto>(storyUpdate);
                return Ok(storyToReturn);
            }
            return BadRequest("Problem update story");
        }
        [Route("GetRateStory/{storyId}")]
        [HttpGet]
        public async Task<ActionResult<int>> GetRateStory(int storyId)
        {
            var YouRate = await _unitOfWork.StoryRepository.GetYouRate(storyId,User.GetUserId());
            if(YouRate == null)
                return Ok(0);
            return Ok(YouRate.Rated);
        }
        [Route("RateStory/{storyId}/{rate}")]
        [HttpPost]
        public async Task<ActionResult> RateStory(int storyId,int rate)
        {
            var existRate = await _unitOfWork.StoryRepository.GetYouRate(storyId,User.GetUserId());
            if(existRate==null){
                var storyRate = await _unitOfWork.StoryRepository.GetStoryById(storyId,true);
                if(storyRate == null)
                    return NotFound();
                var rated = new Rating{
                    UserRatedId = User.GetUserId(),
                    Rated = rate
                };
                storyRate.Ratings.Add(rated);
                if( await _unitOfWork.Complete()){
                return Ok("Rated");
            }
            }
             existRate.Rated = rate;
             await _unitOfWork.Repository.UpdateAsync<Rating>(existRate);
                return Ok("Rated");
            
            //return BadRequest("Problem create Rate");
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStory(int id)
        {
            var storyDelete = await _unitOfWork.StoryRepository.GetStoryById(id);
            if(storyDelete == null)
                return NotFound();
             _unitOfWork.StoryRepository.DeleteStory(storyDelete);
            if(await _unitOfWork.Complete())
                return Ok(id);

            return BadRequest("Problem delete story");
        }
        [Route("GetAllGenre")]
        public async Task<IEnumerable<Genre>> GetAllGenre()
        {
            var genrelist = await _unitOfWork.Repository.SelectAll<Genre>();

            return genrelist;
        }
        [Route("GetAllLanguage")]
        public async Task<IEnumerable<Language>> GetAllLanguage()
        {
            var languageList = await _unitOfWork.Repository.SelectAll<Language>();

            return languageList;
        }
        [Route("GetAllState")]
        public async Task<IEnumerable<Status>> GetAllState()
        {
            var StatusList = await _unitOfWork.Repository.SelectAll<Status>();

            return StatusList;
        }

        [Route("GetAllTags")]
        public async Task<IEnumerable<TagDto>> GetAllTags()
        {
            var TagList = await _unitOfWork.Repository.SelectAll<Tag>();
            
            return _mapper.Map<IEnumerable<TagDto>>(TagList);

        }
    }
}