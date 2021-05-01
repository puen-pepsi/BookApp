using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class StatusesController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public StatusesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Status>>> StatusList()
        {
            return await _unitOfWork.Repository.SelectAll<Status>();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Status>> GetStatus(int id)
        {
            var model = await _unitOfWork.Repository.SelectById<Status>(id);
            if (model == null)
            {
                return NotFound();
            }
            return model;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateStatus(int id, Status model)
        {
            if (id  != model.Id)
            {
                return BadRequest();
            }
            await _unitOfWork.Repository.UpdateAsync<Status>(model);
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult> InsertStatus([FromBody] Status status)
        {
            await _unitOfWork.Repository.CreateAsync<Status>(status);
            return CreatedAtAction("GetStatus", new { id = status.Id }, status);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Status>> DeleteStatus(int id)
        {
            var model = await _unitOfWork.Repository.SelectById<Status>(id);
            if (model == null)
            {
                return NotFound();
            }
            await _unitOfWork.Repository.DeleteAsync<Status>(model);
            return model;
        }

    }
}