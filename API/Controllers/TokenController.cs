using System;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TokenController:BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITokenService _tokenService;
        public TokenController(IUnitOfWork unitOfWork, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _unitOfWork = unitOfWork;

        }
        [HttpPost]
        [Route("refresh")]
        public async Task<ActionResult<UserDto>> Refresh([FromBody] RefreshTokenDto refreshTokenDto)
        {
             if (refreshTokenDto.Token is null)
                return BadRequest("Invalid client request");
            var username = User.GetUsername();  
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);
             if (user == null || user.RefreshToken != refreshTokenDto.Token || 
             user.RefreshTokenExpiryTime <= DateTime.Now)
                return BadRequest("Refresh Token Expired");
             var newRefreshToken = _tokenService.GenerateRefreshToken();
             user.RefreshToken = newRefreshToken.Token;
             user.RefreshTokenExpiryTime = newRefreshToken.Expires;
            await _unitOfWork.Complete();
            return new UserDto{
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                KnownAs = user.KnownAs,
                Point = user.Point,
                Title = user.Title,
                RefreshToken = user.RefreshToken
            };

        }
            
        

    }
}