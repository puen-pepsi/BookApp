using System.Threading.Tasks;
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
        [HttpPost]
        public async Task<ActionResult> InsertTab([FromBody]Report report)
        {
            var userId = User.GetUserId();
            report.UserId= userId;

            await _unitOfWork.Repository.CreateAsync<Report>(report);
            return Ok();

        }
        
    }
}