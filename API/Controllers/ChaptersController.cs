using System;
using System.Collections.Generic;
using API.DTOs;
using API.Entities;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using API.Interfaces;
using System.Linq;
using API.Extensions;

namespace API.Controllers
{
    public class ChaptersController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ChaptersController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;

        }
        //[HttpGet("GetNewChapter/{published}")]
        // public async Task<ActionResult<IEnumerable<StoryChapterDto>>> GetNewChapter(bool published)
        // {
        //     //var storyChapterNew = _unitOfWork.StoryRepository.GetNewChaper(3)
        // }
        [HttpGet("{storyId}/{published}")]
        public async Task<ActionResult<IEnumerable<StoryChapterDto>>> GetChapters([FromRoute] int storyId,[FromRoute] bool published=false)
        {
            var ChapterList = await _unitOfWork.StoryRepository.GetStoryChapterByStoryId(storyId,published);
            if(ChapterList == null)
                return NotFound();
                
            return Ok(_mapper.Map<IEnumerable<StoryChapter>,IEnumerable<StoryChapterDto>>(ChapterList));

        }
         [HttpGet("getrecentchapter/{currentChapter}/{pageSize}")]
        public async Task<ActionResult<IEnumerable<StoryChapterDto>>> GetRecentChapter([FromRoute] int currentChapter,[FromRoute] int pageSize)
        {
            var ChapterList = await _unitOfWork.StoryRepository.GetStoryChapterRecent(currentChapter,pageSize);
            if(ChapterList == null)
                return NotFound();
                
            return Ok(_mapper.Map<IEnumerable<StoryChapter>,IEnumerable<StoryChapterDto>>(ChapterList));

        }
        [HttpGet("getnotpublish/{storyId}")]
        public async Task<ActionResult<IEnumerable<StoryChapterDto>>> getnotpublish([FromRoute] int storyId)
        {
            var ChapterList = await _unitOfWork.StoryRepository.GetStoryChapterByStoryIdNotPublish(storyId);
            if(ChapterList == null)
                return NotFound();
                
            return Ok(_mapper.Map<IEnumerable<StoryChapter>,IEnumerable<StoryChapterDto>>(ChapterList));

        }
        [Route("/api/story/{storyName}/chapters")]//get all chapters
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StoryChapterDto>>> GetChaptersByStoryName(string storyName)
        {

            var ChapterList = await _unitOfWork.StoryRepository.GetStoryChapterByStoryName(storyName);
            if(ChapterList == null)
                return NotFound();
                
            return Ok(_mapper.Map<IEnumerable<StoryChapter>,IEnumerable<StoryChapterDto>>(ChapterList));
        }

        [HttpGet("getchapters/{storyName}/{currentChapter}/{pageSize}")]
        public async Task<ActionResult<IEnumerable<StoryChapterDto>>> GetChaptersByLazyLoad(
                [FromRoute] string storyName,[FromRoute] int currentChapter,[FromRoute] int pageSize)
        {
            var ChapterList = await _unitOfWork.StoryRepository.GetStoryChapterLazyload(storyName,currentChapter,pageSize);
            if(ChapterList == null)
                return NotFound();
            return Ok(_mapper.Map<IEnumerable<StoryChapter>,IEnumerable<StoryChapterDto>>(ChapterList));
        }
        [HttpGet("getchaptersup/{storyName}/{currentChapter}/{pageSize}")]
        public async Task<ActionResult<IEnumerable<StoryChapterDto>>> GetChaptersByLazyLoadUp(
                [FromRoute] string storyName,[FromRoute] int currentChapter,[FromRoute] int pageSize)
        {
            var ChapterList = await _unitOfWork.StoryRepository.GetStoryChapterLazyloadUp(storyName,currentChapter,pageSize);
            if(ChapterList == null)
                return NotFound();
            return Ok(_mapper.Map<IEnumerable<StoryChapter>,IEnumerable<StoryChapterDto>>(ChapterList));
        }
        // [Route("/api/story/{storyName}/chapters/{countSize}/{pageSize}")]
        [HttpGet("getchapterlist/{storyName}/{countSize}/{pageSize}")]
        public async Task<ActionResult<IEnumerable<ChapterListDto>>> GetChaptersByStoryNameTake([FromRoute] string storyName,
                [FromRoute] int countSize,[FromRoute] int pageSize)
        {

            //var ChapterList = await _unitOfWork.StoryRepository.GetStoryChapterByStoryName(storyName);
            var ChapterList = await _unitOfWork.StoryRepository.GetStoryChapterByStoryNameTake(storyName,countSize,pageSize);
            if(ChapterList == null)
                return NotFound();
                
            return Ok(_mapper.Map<IEnumerable<StoryChapter>,IEnumerable<ChapterListDto>>(ChapterList));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetChapterById(int StoryId,int id)
        {
            var Chapter = await _unitOfWork.StoryRepository.GetStoryChapterById(id);
            if(Chapter == null)
                return NotFound();

            return Ok(_mapper.Map<StoryChapter,StoryChapterDto>(Chapter));
        }
        [HttpPost("{storyId}/{publishNow}")]
        public async Task<ActionResult> CreateChapter([FromRoute] int storyId,[FromRoute] bool publishNow,[FromBody] StoryChapterDto storyChapterDto)
        {
            if(!ModelState.IsValid){
                return BadRequest();
            }
            var story = await _unitOfWork.StoryRepository.GetStoryById(storyId,true);
            if(story == null)
                return NotFound();

            var chapter = _mapper.Map<StoryChapter>(storyChapterDto);
            if(publishNow){
                int iCount = story.Chapters.Where(x=>x.Published != null).Count();
                // int cCount = story.Chapters.Count;
                chapter.Order = iCount + 1;    
            }
            
            story.Chapters.Add(chapter);
            if(await _unitOfWork.Complete()) { 
                if(publishNow){
                   var pub = new Published{
                       Created = DateTime.UtcNow,
                       StoryChapterId = chapter.Id
                   };
                   _unitOfWork.StoryRepository.AddPublished(pub);
                    await _unitOfWork.Complete();
                 }       
                 var ChapterToReturn = _mapper.Map<StoryChapterDto>(chapter);

                 var End = story.Chapters.FirstOrDefault(x => x.EndChapter);
                 if(End != null){
                     story.State = "Ended";
                     _unitOfWork.StoryRepository.UpdateStory(story);
                 }else{
                    story.State = "";
                    _unitOfWork.StoryRepository.UpdateStory(story);
                 } 
                 await _unitOfWork.Complete();

                // return CreatedAtAction("GetStory",new{id = storyToReturn.StoryId},storyToReturn);
                return Ok(ChapterToReturn);
            }           
            return BadRequest("Problem create Chapter");
        }

        [HttpPut("{storyId}/{id}/{publish}")]
        public async Task<ActionResult> UpdateStoryChapter([FromRoute]int storyId,[FromRoute]int id,[FromRoute] bool publish,[FromBody] StoryChapterDto storyChapterDto)
        {

            var chapterUpdate = await _unitOfWork.StoryRepository.GetStoryChapterById(id);
            if(chapterUpdate == null)
                return NotFound();
            storyChapterDto.Id = chapterUpdate.Id;
            storyChapterDto.StoryId = chapterUpdate.StoryId;
            if(publish && chapterUpdate.Published == null){
                var story = await _unitOfWork.StoryRepository.GetStoryById(chapterUpdate.StoryId,true);
                int iCount = story.Chapters.Where(x=>x.Published != null).Count();
                storyChapterDto.Order = iCount + 1;
            }
            _mapper.Map<StoryChapterDto,StoryChapter>(storyChapterDto,chapterUpdate);

            _unitOfWork.StoryRepository.UpdateStoryChapter(chapterUpdate);
            if(await _unitOfWork.Complete()){
                if(publish && chapterUpdate.Published == null){
                    var pub = new Published
                    {
                        Created = DateTime.UtcNow,
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
        [HttpPut("published/{storyId}/{id}")]
        public async Task<IActionResult> published([FromRoute]int storyId,[FromRoute] int id)
        {
                    var chapterUpdate = await _unitOfWork.StoryRepository.GetStoryChapterById(id);
                    if(chapterUpdate == null)
                        return NotFound();
                    var story = await _unitOfWork.StoryRepository.GetStoryById(chapterUpdate.StoryId,true);
                    int iCount = story.Chapters.Where(x=>x.Published != null).Count();
                    chapterUpdate.Order = iCount + 1;
                     _unitOfWork.StoryRepository.UpdateStoryChapter(chapterUpdate);
                    var pub = new Published
                    {
                        Created = DateTime.UtcNow,
                        StoryChapterId = id
                    };
                    _unitOfWork.StoryRepository.AddPublished(pub);
                    if(await _unitOfWork.Complete())
                        return Ok("published");
                return NoContent();
        }
        [HttpPut("up/{storyId}/{order}")]
        public async Task<IActionResult> Up([FromRoute]int storyId,[FromRoute]int order)
        {
            var chapterlist = await _unitOfWork.StoryRepository.GetStoryChapterByStoryId(storyId,false);
            if(chapterlist.Max(x => x.Order) == order)return NoContent();
            var chapterUp = chapterlist.Where(o => o.Order == order).FirstOrDefault();
            var chapterDown = chapterlist.Where( o => o.Order == order+1).FirstOrDefault();
            if(chapterDown.EndChapter){
                chapterDown.EndChapter = false;
                chapterUp.EndChapter =true;
            }
            chapterUp.Order = chapterUp.Order + 1;
            chapterDown.Order = chapterDown.Order - 1;
            await _unitOfWork.Repository.UpdateAsync<StoryChapter>(chapterUp);
            await _unitOfWork.Repository.UpdateAsync<StoryChapter>(chapterDown);
            return Ok("up");
        }
        [HttpPut("down/{storyId}/{order}")]
        public async Task<IActionResult> Down([FromRoute]int storyId,[FromRoute]int order)
        {                

            if(order == 1)return NoContent();
            var chapterlist = await _unitOfWork.StoryRepository.GetStoryChapterByStoryId(storyId,true);
            var chapterDown = chapterlist.Where( o => o.Order == order).FirstOrDefault();
            var chapterUp = chapterlist.Where(o => o.Order == order-1).FirstOrDefault();

            if(chapterDown.EndChapter){
                chapterUp.EndChapter= true;
                chapterDown.EndChapter =false;
            }
            chapterDown.Order = chapterDown.Order - 1;
            chapterUp.Order = chapterUp.Order +1;
            await _unitOfWork.Repository.UpdateAsync<StoryChapter>(chapterDown);  
            await _unitOfWork.Repository.UpdateAsync<StoryChapter>(chapterUp);
            
            return Ok("down");
        }

        
        [HttpPost("addlike/{chapterId}")]
        public async Task<ActionResult<Boolean>> addlike(int chapterId)
        {
            var userId = User.GetUserId();
            var chapter = await _unitOfWork.StoryRepository.GetStoryChapterById(chapterId);
            var existliked = await _unitOfWork.StoryRepository.GetLikedChapter(chapterId,userId);
            if(existliked != null){
                _unitOfWork.StoryRepository.DeleteLikeChapter(existliked);
                return Ok(false);
            }else{
                var currentUser = await _unitOfWork.UserRepository.GetUserByIdAsync(userId);
                var userLiked = new LikeChapter{
                    UserActive = currentUser,
                    UserActiveId  = userId,
                    ChapterId = chapterId
                };
                 chapter.LikeChapters.Add(userLiked); 
            }
            
            if( await _unitOfWork.Complete()){
                return Ok(true);
            }
            return BadRequest("Problem like comment");
        }
    }
}