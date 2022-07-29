using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ActivitiesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;

        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecievePointDto>>> GetActivitiesUser()
        {
            var user = User.GetUserId();
            var pointList = await _unitOfWork.ActivitiesRepository.GetListPoint(user);
            return Ok(_mapper.Map<IEnumerable<RecievePointDto>>(pointList));
        }
        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<RecievePoint>>> GetPointByUserId(int userId)
        {
            var totalpoint = await _unitOfWork.ActivitiesRepository.GetTotalPoint(userId);
            return Ok(totalpoint);
        }
        // [HttpGet("{type}")]
        // public async Task<ActionResult<ActivitiesPoint>> GetPointByType(ActivitiesType type)
        // {
        //}
        [HttpPost("{storyName}")]
        public async Task<ActionResult<Activities>> Activities([FromBody] Activities activities, string storyName)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var userid = User.GetUserId();
            activities.UserActiveId = userid;
            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(activities.UserActiveId);
            var story = await _unitOfWork.StoryRepository.GetStoryByName(storyName,false);
            activities.story = story;
            var author = await _unitOfWork.UserRepository.GetUserByIdAsync(story.AuthorId);
            var PointType = await _unitOfWork.ActivitiesRepository.GetPoint(activities.Type);
            //activities.UserActiveId = userid;
            _unitOfWork.ActivitiesRepository.AddActivities(activities);
            if (!await _unitOfWork.Complete()) return BadRequest("Problem Add Activities");
            //Author write Chapter
            if (activities.Type == ActivitiesType.writeChapter)
            {
                var authorPoint = new RecievePoint
                {
                    ActivitiesId = activities.Id,
                    RecievePointUserId = story.AuthorId,
                    Point = PointType.AuthorPoint
                };
                activities.getPoint.Add(authorPoint);
                author.recievePoints.Add(authorPoint);
                //Add point to AppUser.Point
                author.Point += authorPoint.Point;
                 _unitOfWork.UserRepository.Update(author);
            }
            else
            {
                //ActiveUser
                var userPoint = new RecievePoint
                {
                    ActivitiesId = activities.Id,
                    RecievePointUserId = activities.UserActiveId,
                    Point = PointType.ActiveUserPoint
                };
                activities.getPoint.Add(userPoint);
                user.recievePoints.Add(userPoint);
                //Add point to Appuser.Point
                  user.Point += userPoint.Point;
                 _unitOfWork.UserRepository.Update(user);
                //AuthorPoint
                if (PointType.AuthorPoint != 0 && story.AuthorId != activities.UserActiveId)
                {
                    var authorPoint = new RecievePoint
                    {
                        ActivitiesId = activities.Id,
                        RecievePointUserId = story.AuthorId,
                        Point = PointType.AuthorPoint
                    };
                    activities.getPoint.Add(authorPoint);
                    author.recievePoints.Add(authorPoint);
                    //Add point to AppUser.Point
                    author.Point += authorPoint.Point;
                    _unitOfWork.UserRepository.Update(author);
                }
            }

            if (!await _unitOfWork.Complete()) return BadRequest("Problem Add Point");
            var activitiesReturn = await _unitOfWork.ActivitiesRepository.GetActivities(activities.Id);

            return Ok(activitiesReturn);
        }


    }
}