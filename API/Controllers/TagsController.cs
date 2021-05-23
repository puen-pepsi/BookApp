using System.Collections.Generic;
using System.Threading.Tasks;
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