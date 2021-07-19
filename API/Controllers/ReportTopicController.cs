using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ReportTopicController : BaseApiController
    {
         private readonly IUnitOfWork _unitOfWork;
        public ReportTopicController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;

        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReportTopic>>> ReportTopicList()
        {
            return await _unitOfWork.Repository.SelectAll<ReportTopic>();
        } 

        [HttpGet("{id}")]
        public async Task<ActionResult<ReportTopic>> GetReportTopic(int id)
        {
            var model = await _unitOfWork.Repository.SelectById<ReportTopic>(id);
            if(model == null){
                return NotFound();
            }
            return model;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateReportTopic(int id,ReportTopic reportTopic)
        {
            if(id != reportTopic.id){
                return BadRequest();
            }
            await _unitOfWork.Repository.UpdateAsync<ReportTopic>(reportTopic);
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult> InsertReportTopic([FromBody]ReportTopic reportTopic)
        {
            await _unitOfWork.Repository.CreateAsync<ReportTopic>(reportTopic);
            return CreatedAtAction("GetReportTopic",new {id = reportTopic.id},reportTopic);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ReportTopic>> Delete(int id)
        {
            var model = await _unitOfWork.Repository.SelectById<ReportTopic>(id);
            if(model == null){
                return NotFound();
            }
            await _unitOfWork.Repository.DeleteAsync<ReportTopic>(model);
            return model;
        }
    }
}