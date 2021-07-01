using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, 
                ITokenService tokenService, IMapper mapper)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _mapper = mapper;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");

            var user = _mapper.Map<AppUser>(registerDto);

            user.UserName = registerDto.Username.ToLower();

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if (!roleResult.Succeeded) return BadRequest(result.Errors);

            return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                //KnownAs = user.KnownAs,
                //Gender = user.Gender
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users
                .Include(p => p.Photos)
                .Include(l => l.LikedStoryByUsers)
                .SingleOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

            if (user == null) return Unauthorized("Invalid username");

            var result = await _signInManager
                .CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized();

            return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                //KnownAs = user.KnownAs,
                //Gender = user.Gender,
                //MyList =  user.LikedStoryByUsers.Select(s => s.LikedStoryId).ToArray()
            };
        }

        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
        }

        [HttpPost("ExternalLogin")]
        public async Task<ActionResult<UserDto>> ExternalLogin([FromBody] ExternalAuthDto externalAuth)
        {
            var payload =  await _tokenService.VerifyGoogleToken(externalAuth);
            if(payload == null)
                return BadRequest("Invalid External Authentication.");
            var info = new UserLoginInfo(externalAuth.Provider, payload.Subject, externalAuth.Provider);
            var user = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);
            if (user == null)
            {
                user = await _userManager.FindByEmailAsync(payload.Email);
                if (user == null)
                {
                    var photo = new Photo{
                        Url = payload.Picture,
                        IsMain = true
                    };
                    user = new AppUser { 
                        Email = payload.Email, 
                        UserName = payload.GivenName,
                        //KnownAs = payload.GivenName,
                        // Photos = new Photo {
                        //     Url= payload.Picture,
                        //     IsMain = true
                        // }
                        Photos = {photo}
                    };
                    await _userManager.CreateAsync(user);    
                    //prepare and send an email for the email confirmation
                    await _userManager.AddToRoleAsync(user, "Member");
                    await _userManager.AddLoginAsync(user, info);
                }
                else
                {
                    await _userManager.AddLoginAsync(user, info);
                }
            }
            if (user == null)
                return BadRequest("Invalid External Authentication.");
            //check for the Locked out account
            //var token = await _tokenService.CreateToken(user);
            var main = await _userManager.Users
                                .Include(p => p.Photos)
                                .SingleOrDefaultAsync(x => x.Id == user.Id);
            return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                PhotoUrl = main.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                //KnownAs = user.KnownAs,
                //Gender = user.Gender,
            };
            // return Ok(new AuthResponseDto { Token = token, IsAuthSuccessful = true });
        }

        // [Route("Savesresponse")]    
        // [HttpPost]    
        // public object Savesresponse(Users user)    
        // {    
        //     try    
        //     {    
        //         SocialLoginEntities DB = new SocialLoginEntities();    
        //         Socaillogin Social= new Socaillogin();    
        //         if (Social.TId == 0)    
        //         {    
        //             Social.name = user.name;    
        //             Social.email = user.email;    
        //             Social.provideid = user.provideid;    
        //             Social.provider = user.provider;    
        //             Social.image = user.image;    
        //             Social.token = user.token;    
        //             Social.idToken = user.idToken;    
        //             var a=  DB.Socaillogins.Add(Social);    
        //             DB.SaveChanges();    
        //             return a;    
        //         }    
        //     }    
        //     catch (Exception)    
        //     {    
    
        //         throw;    
        //     }    
        //     return new Response    
        //     { Status = "Error", Message = "Invalid Data." };    
        // }    

    }
}