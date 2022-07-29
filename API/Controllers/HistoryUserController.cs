using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class HistoryUserController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public HistoryUserController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;

        }
        [HttpPost("{storyname}/{fregment}")]
        public async Task<ActionResult> AddHistoryStory([FromRoute] string storyname, [FromRoute] string fregment)
        {
            var sourceUserId = User.GetUserId();
            var storyHistory = await _unitOfWork.StoryRepository.GetStoryByName(storyname,false);
            var sourceUser = await _unitOfWork.HistoryRepository.GetHistoryStoryWithUser(sourceUserId);
            //check liked
            if (storyHistory == null) return NotFound();
            //if(sourceUser.StoryName == storyname) return BadRequest("This story Liked");

            var userHistoryStory = await _unitOfWork.HistoryRepository.GetUserHistory(sourceUserId, storyHistory.Id);
            //Update
            //if( userHistoryStory != null ) return BadRequest("You already follow this story");
            if (userHistoryStory != null)
            {
                userHistoryStory.fregment = fregment;
                userHistoryStory.Created = DateTime.UtcNow;
                await _unitOfWork.Repository.UpdateAsync<UserHistory>(userHistoryStory);
                return NoContent();
            }
            userHistoryStory = new UserHistory
            {
                SourceUserId = sourceUserId,
                HistoryStoryId = storyHistory.Id,
                fregment = fregment
            };

            sourceUser.UserHistory.Add(userHistoryStory);
            if (await _unitOfWork.Complete()) return Ok();
            return BadRequest("Failed to Add History story");
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HistoryStoryDto>>> GetUserHistory([FromQuery] HistoryStoryParams historyStoryParams)
        {
            historyStoryParams.UserId = User.GetUserId();
            var history = await _unitOfWork.HistoryRepository.GetHistoryUser(historyStoryParams);

            Response.AddPaginationHeader(history.CurrentPage,
                history.PageSize, history.TotalCount, history.TotalPages);

            return Ok(history);
        }
        [HttpGet("{historyStoryId}")]
        public async Task<ActionResult<UserHistoryDto>> GetHistoryForUser(int historyStoryId)
        {
            var userId = User.GetUserId();
            var history = await _unitOfWork.HistoryRepository.GetHistoryForUser(userId,historyStoryId);
            var userHistory = _mapper.Map<UserHistoryDto>(history);
            return Ok(userHistory);
        }
        [HttpDelete("{storyId}")]
        public async Task<ActionResult> DeleteHistory(int storyId)
        {
            var userId = User.GetUserId();
            var history = await _unitOfWork.HistoryRepository.GetUserHistory(userId, storyId);
            _unitOfWork.HistoryRepository.DeleteHistory(history);
            if (await _unitOfWork.Complete()) return Ok();
            return BadRequest("Problem deleting the History");
        }

    }
}