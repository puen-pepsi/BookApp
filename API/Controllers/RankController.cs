using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class RankController : BaseApiController
    {
         private readonly IUnitOfWork _unitOfWork;
        public RankController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;

        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rank>>> RankList()
        {
            return await _unitOfWork.Repository.SelectAll<Rank>();
        } 

        [HttpGet("{id}")]
        public async Task<ActionResult<Rank>> GetRank(int id)
        {
            var model = await _unitOfWork.Repository.SelectById<Rank>(id);
            if(model == null){
                return NotFound();
            }
            return model;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateRank(int id,Rank rank)
        {
            if(id != rank.Id){
                return BadRequest();
            }
            await _unitOfWork.Repository.UpdateAsync<Rank>(rank);
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult> InsertRank([FromBody]Rank rank)
        {
            await _unitOfWork.Repository.CreateAsync<Rank>(rank);
            return CreatedAtAction("GetRank",new {id = rank.Id},rank);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Rank>> DeleteRank(int id)
        {
            var model = await _unitOfWork.Repository.SelectById<Rank>(id);
            if(model == null){
                return NotFound();
            }
            await _unitOfWork.Repository.DeleteAsync<Rank>(model);
            return model;
        }
    }
}