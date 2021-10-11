using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class VipUserController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public VipUserController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        [HttpGet]
        public async Task<IEnumerable<VipUserDto>> VipList()
        {
            return await _unitOfWork.UserRepository.GetAllVipUser();
        } 
    }
}