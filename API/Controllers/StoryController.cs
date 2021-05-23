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
        public async Task<ActionResult<Story>> Get()
        {
            var username = User.GetUsername();
            if(username == null)
                return NotFound();
            var storyUserList = await _unitOfWork.StoryRepository.GetStoryByUserName(username);
            return Ok(storyUserList);
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
            storyDto.Created = DateTime.UtcNow;
            var createStory = _mapper.Map<Story>(storyDto);

            _unitOfWork.StoryRepository.AddStory(createStory);
            if(await _unitOfWork.Complete()) {
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
            _mapper.Map<StoryDto,Story>(storyDto,storyUpdate);
            _unitOfWork.StoryRepository.UpdateStory(storyUpdate);
            if(await _unitOfWork.Complete()){
                var storyToReturn = _mapper.Map<StoryDto>(storyUpdate);
                return Ok(storyToReturn);
            }
            return BadRequest("Problem update story");
        }
        // [HttpPost]
        // [Route("rate-story")]
        // public async Task<ActionResult> RateStory(int rate,int storyId)
        // {
        //     var storyRate = _unitOfWork.StoryRepository.GetStoryById(storyId,true);
        //     storyRate
        // }
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
        public async Task<IEnumerable<Tag>> GetAllGenre()
        {
            var genrelist = await _unitOfWork.Repository.SelectAll<Tag>();

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
    }
}