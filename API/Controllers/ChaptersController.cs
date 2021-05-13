using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("/api/story/{storyId}/chapter")]
    public class ChaptersController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ChaptersController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;

        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StoryChapter>>> GetChapterByStoryId(int storyId)
        {

            var ChapterList = await _unitOfWork.StoryRepository.GetStoryChapterByStoryId(storyId);
            if(ChapterList == null)
                return NotFound();
                
            return Ok(_mapper.Map<IEnumerable<StoryChapter>,IEnumerable<StoryChapterDto>>(ChapterList));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetChapterById(int StoryId,int id)
        {
            var Chapter = await _unitOfWork.StoryRepository.GetStoryChapterById(id);
            if(Chapter == null)
                return NotFound();

            return Ok(_mapper.Map<StoryChapter,StoryChapterDto>(Chapter));
        }
        [HttpPost("{publishNow}")]
        public async Task<ActionResult> CreateChapter(int storyId,[FromBody] StoryChapterDto storyChapterDto,bool publishNow)
        {
            if(!ModelState.IsValid){
                return BadRequest();
            }
            var story = await _unitOfWork.StoryRepository.GetStoryById(storyId,true);
            if(story == null)
                return NotFound();

            var chapter = _mapper.Map<StoryChapter>(storyChapterDto);
            
            story.Chapters.Add(chapter);
            if(await _unitOfWork.Complete()) { 
                if(publishNow){
                   var pub = new Published{
                       Created = DateTime.Now,
                       StoryChapterId = chapter.Id
                   };
                   _unitOfWork.StoryRepository.AddPublished(pub);
                    await _unitOfWork.Complete();
                 }       
                     var ChapterToReturn = _mapper.Map<StoryChapterDto>(chapter);

                // return CreatedAtAction("GetStory",new{id = storyToReturn.StoryId},storyToReturn);
                return Ok(ChapterToReturn);
            }           
            return BadRequest("Problem create Chapter");
        }

        [HttpPut("{id}/{publish}")]
        public async Task<ActionResult> UpdateStory([FromRoute]int id,[FromRoute] bool publish,[FromBody] StoryChapterDto storyChapterDto)
        {

            var chapterUpdate = await _unitOfWork.StoryRepository.GetStoryChapterById(id);
            if(chapterUpdate == null)
                return NotFound();
            storyChapterDto.Id = chapterUpdate.Id;
            storyChapterDto.StoryId = chapterUpdate.StoryId;
            
            _mapper.Map<StoryChapterDto,StoryChapter>(storyChapterDto,chapterUpdate);

            _unitOfWork.StoryRepository.UpdateStoryChapter(chapterUpdate);
            if(await _unitOfWork.Complete()){
                if(publish){
                    var pub = new Published
                    {
                        Created = DateTime.Now,
                        StoryChapterId = chapterUpdate.Id
                    };
                    _unitOfWork.StoryRepository.AddPublished(pub);
                    await _unitOfWork.Complete();
                }
                
                var chapterToReturn = _mapper.Map<StoryChapterDto>(chapterUpdate);
                return Ok(chapterToReturn);
            }
            return BadRequest("Problem update story chapter");
        }


    }
}