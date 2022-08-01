using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ReportController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ReportController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;

        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReportDto>>> getReport(){
            var getReport = await _unitOfWork.UserRepository.GetAllReport();
            if(getReport == null)return BadRequest("No Report");
            var getReportReturn = _mapper.Map<IEnumerable<ReportDto>>(getReport);
            return Ok(getReportReturn);
        }
        [HttpPost]
        public async Task<ActionResult> InsertTab([FromBody]Report report)
        {
            var userId = User.GetUserId();
            report.UserId= userId;

            await _unitOfWork.Repository.CreateAsync<Report>(report);
            return Ok();

        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Report>> Delete(int id)
        {
            var model = await _unitOfWork.Repository.SelectById<Report>(id);
            if(model == null){
                return NotFound();
            }
            await _unitOfWork.Repository.DeleteAsync<Report>(model);
            return model;
        }
        [HttpDelete("comment/{id}")]
        public async Task<ActionResult<StoryComment>> DeleteComment(int id)
        {
            var model = await _unitOfWork.Repository.SelectById<StoryComment>(id);
            if(model == null){
                return NotFound();
            }
            await _unitOfWork.Repository.DeleteAsync<StoryComment>(model);
            return model;
        }
    }
}