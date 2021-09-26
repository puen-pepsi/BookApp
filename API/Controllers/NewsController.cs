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
    public class NewsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public NewsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;

        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NewsShowDto>>> GetNews()
        {
            var getnews = await _unitOfWork.NewsRepository.GetNewsAll();
            var newsAll = _mapper.Map<IEnumerable<NewsShowDto>>(getnews);
            return Ok(newsAll);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<NewsShowDto>> GetNew(int id)
        {
            var news = await _unitOfWork.NewsRepository.GetNews(id);
            return Ok(_mapper.Map<NewsShowDto>(news));
        }
        [HttpGet("take/{take}")]
        public async Task<ActionResult<IEnumerable<NewsShowDto>>> GetNewsTake(int take)
        {
            var getnews = await _unitOfWork.NewsRepository.GetNewsList(take);
            var newsAll = _mapper.Map<IEnumerable<NewsShowDto>>(getnews);
            return Ok(newsAll);
        }
        [HttpGet("lazyload/{current}/{take}")]
        public async Task<ActionResult<IEnumerable<NewsShowDto>>> GetLazyLoadNew(int current ,int take)
        {
            var getnews = await _unitOfWork.NewsRepository.GetNewsLazyLoad(current,take);
            var newsAll = _mapper.Map<IEnumerable<NewsShowDto>>(getnews);
            return Ok(newsAll);
        } 
        [HttpPost]
        public async Task<ActionResult> CreatNews([FromBody] NewsDto newsDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var userId = User.GetUserId();
            newsDto.UserNewsId = userId;
            var creatNews = _mapper.Map<News>(newsDto);
 
           _unitOfWork.NewsRepository.AddNews(creatNews);
           if(await _unitOfWork.Complete()){
               return Ok(creatNews);
           }
           return BadRequest("Problem create News");
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateNews(int id,[FromBody] NewsDto newsDto)
        {

            var newsUpdate = await _unitOfWork.NewsRepository.GetNews(id);
            newsDto.UserNewsId = newsUpdate.UserNewsId;
            if(newsUpdate == null)
                return NotFound();
            _mapper.Map<NewsDto,News>(newsDto,newsUpdate);
            _unitOfWork.NewsRepository.UpdateNews(newsUpdate);
            if(await _unitOfWork.Complete()){
                
                var newsToReturn = _mapper.Map<NewsShowDto>(newsUpdate);
                return Ok(newsToReturn);
            }
            return BadRequest("Problem update story");
        }
         [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNews(int id)
        {
            var newsDelete = await _unitOfWork.NewsRepository.GetNews(id);
            if(newsDelete == null)
                return NotFound();
             _unitOfWork.NewsRepository.DeleteNews(newsDelete);
            if(await _unitOfWork.Complete())
                return Ok(id);

            return BadRequest("Problem delete story");
        }
    }
}