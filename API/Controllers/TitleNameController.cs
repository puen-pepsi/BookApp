using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TitleNameController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public TitleNameController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;

        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TitleName>>> TitleNameList()
        {
            return await _unitOfWork.Repository.SelectAll<TitleName>();
        } 

        [HttpGet("{id}")]
        public async Task<ActionResult<TitleName>> GetTitleName(int id)
        {
            var model = await _unitOfWork.Repository.SelectById<TitleName>(id);
            if(model == null){
                return NotFound();
            }
            return model;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTitleName(int id,TitleName TitleName)
        {
            if(id != TitleName.Id){
                return BadRequest();
            }
            await _unitOfWork.Repository.UpdateAsync<TitleName>(TitleName);
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult> InsertTitleName([FromBody]TitleName TitleName)
        {
            await _unitOfWork.Repository.CreateAsync<TitleName>(TitleName);
            return CreatedAtAction("GetTitleName",new {id = TitleName.Id},TitleName);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TitleName>> DeleteTitleName(int id)
        {
            var model = await _unitOfWork.Repository.SelectById<TitleName>(id);
            if(model == null){
                return NotFound();
            }
            await _unitOfWork.Repository.DeleteAsync<TitleName>(model);
            return model;
        }
    }
}