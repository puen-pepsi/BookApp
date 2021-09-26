using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PointController : BaseApiController
    {
         private readonly IUnitOfWork _unitOfWork;
        public PointController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;

        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActivitiesPoint>>> ActivitiesPointList()
        {
            return await _unitOfWork.Repository.SelectAll<ActivitiesPoint>();
        } 

        [HttpGet("{id}")]
        public async Task<ActionResult<ActivitiesPoint>> GetActivitiesPoint(int id)
        {
            var model = await _unitOfWork.Repository.SelectById<ActivitiesPoint>(id);
            if(model == null){
                return NotFound();
            }
            return model;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateActivitiesPoint(int id,ActivitiesPoint activitiesPoint)
        {
            if(id != activitiesPoint.Id){
                return BadRequest();
            }
            await _unitOfWork.Repository.UpdateAsync<ActivitiesPoint>(activitiesPoint);
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult> InsertActivitiesPoint([FromBody]ActivitiesPoint activitiesPoint)
        {
            await _unitOfWork.Repository.CreateAsync<ActivitiesPoint>(activitiesPoint);
            return CreatedAtAction("GetActivitiesPoint",new {id = activitiesPoint.Id},activitiesPoint);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ActivitiesPoint>> DeleteActivitiesPoint(int id)
        {
            var model = await _unitOfWork.Repository.SelectById<ActivitiesPoint>(id);
            if(model == null){
                return NotFound();
            }
            await _unitOfWork.Repository.DeleteAsync<ActivitiesPoint>(model);
            return model;
        }
    }
}