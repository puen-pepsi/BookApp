using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LanguageController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public LanguageController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Language>>> LanguageList()
        {
            return await _unitOfWork.Repository.SelectAll<Language>();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Language>> GetLanguage(int id)
        {
            var model = await _unitOfWork.Repository.SelectById<Language>(id);
            if (model == null)
            {
                return NotFound();
            }
            return model;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateLanguage(int id, Language model)
        {
            if (id != model.Id)
            {
                return BadRequest();
            }
            await _unitOfWork.Repository.UpdateAsync<Language>(model);
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult> InsertLanguage([FromBody] Language language)
        {
            await _unitOfWork.Repository.CreateAsync<Language>(language);
            return CreatedAtAction("GetLanguage", new { id = language.Id }, language);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Language>> DeleteStatus(int id)
        {
            var model = await _unitOfWork.Repository.SelectById<Language>(id);
            if (model == null)
            {
                return NotFound();
            }
            await _unitOfWork.Repository.DeleteAsync<Language>(model);
            return model;
        }
    }
}