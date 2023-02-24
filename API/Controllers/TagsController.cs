using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TagsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public TagsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;

        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tag>>> TagList()
        {
            return await _unitOfWork.Repository.SelectAll<Tag>();
        } 

        [HttpGet("{id}")]
        public async Task<ActionResult<Tag>> GetTag(int id)
        {
            var model = await _unitOfWork.Repository.SelectById<Tag>(id);
            if(model == null){
                return NotFound();
            }
            return model;
        }
        [HttpGet("taglist/{tagname}")]
        public async Task<ActionResult<IEnumerable<StoryTagDto>>> GetTagAsync(string tagname)
        {
            var curtag = _unitOfWork.TagRepository.GetTagName(tagname);
            var taglist =  await _unitOfWork.TagRepository.GetStoryByTagName(tagname);
            var newlist  =    taglist.Select( t => new StoryTagDto{
                                storyId = t.Stories.Id,
                                storyName = t.Stories.StoryName,
                                Genre =t.Stories.Genre,
                                Description = t.Stories.Description,
                                imageUrl = t.Stories.ImageUrl,
                                Tags = t.Stories.Tags,
                                UserName = t.Stories.UserName
                              });
            return Ok(newlist);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTag(int id,Tag tag)
        {
            if(id != tag.Id){
                return BadRequest();
            }
            await _unitOfWork.Repository.UpdateAsync<Tag>(tag);
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult> InsertTab([FromBody]Tag tag)
        {
            await _unitOfWork.Repository.CreateAsync<Tag>(tag);
            return CreatedAtAction("GetTag",new {id = tag.Id},tag);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Tag>> DeleteTag(int id)
        {
            var model = await _unitOfWork.Repository.SelectById<Tag>(id);
            if(model == null){
                return NotFound();
            }
            await _unitOfWork.Repository.DeleteAsync<Tag>(model);
            return model;
        }
    }
}