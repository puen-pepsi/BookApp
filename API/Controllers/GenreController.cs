using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class GenreController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public GenreController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Statuses>>> GenreList()
        {
            return await _unitOfWork.Repository.SelectAll<Statuses>();
        } 

        [HttpGet("{id}")]
        public async Task<ActionResult<Statuses>> GetGenre(int id)
        {
            var model = await _unitOfWork.Repository.SelectById<Statuses>(id);
            if(model == null){
                return NotFound();
            }
            return model;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateGenre(int id,Statuses genre)
        {
            if(id != genre.Id){
                return BadRequest();
            }
            await _unitOfWork.Repository.UpdateAsync<Statuses>(genre);
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult> InsertGenre([FromBody]Statuses genre)
        {
            await _unitOfWork.Repository.CreateAsync<Statuses>(genre);
            return CreatedAtAction("GetGenre",new {id = genre.Id},genre);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Statuses>> DeleteGenre(int id)
        {
            var model = await _unitOfWork.Repository.SelectById<Statuses>(id);
            if(model == null){
                return NotFound();
            }
            await _unitOfWork.Repository.DeleteAsync<Statuses>(model);
            return model;
        }

    }
}