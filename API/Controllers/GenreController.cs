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
        public async Task<ActionResult<IEnumerable<Genre>>> GenreList()
        {
            return await _unitOfWork.Repository.SelectAll<Genre>();
        } 

        [HttpGet("{id}")]
        public async Task<ActionResult<Genre>> GetGenre(int id)
        {
            var model = await _unitOfWork.Repository.SelectById<Genre>(id);
            if(model == null){
                return NotFound();
            }
            return model;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateGenre(int id,Genre genre)
        {
            if(id != genre.Id){
                return BadRequest();
            }
            await _unitOfWork.Repository.UpdateAsync<Genre>(genre);
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult> InsertGenre([FromBody]Genre genre)
        {
            await _unitOfWork.Repository.CreateAsync<Genre>(genre);
            return CreatedAtAction("GetGenre",new {id = genre.Id},genre);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Genre>> DeleteGenre(int id)
        {
            var model = await _unitOfWork.Repository.SelectById<Genre>(id);
            if(model == null){
                return NotFound();
            }
            await _unitOfWork.Repository.DeleteAsync<Genre>(model);
            return model;
        }

    }
}