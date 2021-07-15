using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using EmailService;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IEmailSender _emailSender;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
        
        ITokenService tokenService, IMapper mapper,IEmailSender emailSender)
        {
            _emailSender = emailSender;
            _signInManager = signInManager;
            _userManager = userManager;
            _mapper = mapper;
            _tokenService = tokenService;
        }

    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDto registerDto)
    {
        if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");

        var user = _mapper.Map<AppUser>(registerDto);

        user.UserName = registerDto.Username.ToLower();

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded) return BadRequest(result.Errors);

        var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
        var param = new Dictionary<string, string>
        {
            {"token", token },
            {"email", user.Email }
        };
        var callback = QueryHelpers.AddQueryString(registerDto.ClientURI, param);
        var message = new MailMessage(new string[] { user.Email }, "Rainobu Email Confirmation", 
                $"Please Email Confirmation by clicking this : <a href='{callback}'>link</a>", 
                null);
        await _emailSender.SendEmailAsync(message);

        var roleResult = await _userManager.AddToRoleAsync(user, "Member");

        if (!roleResult.Succeeded) return BadRequest(result.Errors);

        // return new UserDto
        // {
        //     Username = user.UserName,
        //     Token = await _tokenService.CreateToken(user),
        //     //KnownAs = user.KnownAs,
        //     //Gender = user.Gender
        // };
        return Ok();
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = new AppUser();
        if(loginDto.Username.Contains("@")){
             user = await _userManager.Users
            .Include(p => p.Photos)
            .Include(l => l.LikedStoryByUsers)
            .SingleOrDefaultAsync(x => x.Email == loginDto.Username.ToLower());
        }else{
             user = await _userManager.Users
            .Include(p => p.Photos)
            .Include(l => l.LikedStoryByUsers)
            .SingleOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower()); 
        }

        // var user = await _userManager.FindByNameAsync(userForAuthentication.Email);
        if (user == null)
            return BadRequest("Invalid Request");

        if (!await _userManager.IsEmailConfirmedAsync(user))
            return Unauthorized("Email is not confirmed");

        if (user == null) return Unauthorized("Invalid username");

        if (!await _userManager.IsEmailConfirmedAsync(user))
            return Unauthorized(new AuthResponseDto { ErrorMessage = "Email is not confirmed" });

        var result = await _signInManager
            .CheckPasswordSignInAsync(user, loginDto.Password, false);

        if (!result.Succeeded) return Unauthorized("Invalid Password");

        return new UserDto
        {
            Username = user.UserName,
            Token = await _tokenService.CreateToken(user),
            PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
            KnownAs = user.KnownAs,
            //Gender = user.Gender,
            //MyList =  user.LikedStoryByUsers.Select(s => s.LikedStoryId).ToArray()
        };
    }
    
    [HttpPost("ForgotPassword")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
    {
        if (!ModelState.IsValid)
            return BadRequest();

        var user = await _userManager.FindByEmailAsync(forgotPasswordDto.Email);
        if (user == null)
            return BadRequest("Invalid Request");

        var token = await _userManager.GeneratePasswordResetTokenAsync(user);         
        var param = new Dictionary<string, string>
        {
            {"token", token },
            {"email", forgotPasswordDto.Email }
        };

        var callback = QueryHelpers.AddQueryString(forgotPasswordDto.ClientURI, param);

        var message = new MailMessage
        (new string[] { user.Email }, "Rainobu Reset password",   
        $"Please Reset password by clicking this : <a href='{callback}'>link</a>",
         null);
        await _emailSender.SendEmailAsync(message);

        return Ok();
    }
    [HttpPost("ResetPassword")]
		public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
		{
			if (!ModelState.IsValid)
				return BadRequest();

			var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);
			if (user == null)
				return BadRequest("Invalid Request");

			var resetPassResult = await _userManager.ResetPasswordAsync(user, resetPasswordDto.Token, resetPasswordDto.Password);
			if (!resetPassResult.Succeeded)
			{
				var errors = resetPassResult.Errors.Select(e => e.Description);

				return BadRequest(new { Errors = errors });
			}

			await _userManager.SetLockoutEndDateAsync(user, new DateTime(2000, 1, 1));

			return Ok();
		}
    [HttpGet("EmailConfirmation")]
    public async Task<IActionResult> EmailConfirmation([FromQuery] string email, [FromQuery] string token)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
            return BadRequest("Invalid Email Confirmation Request");

        var confirmResult = await _userManager.ConfirmEmailAsync(user, token);
        if (!confirmResult.Succeeded)
            return BadRequest("Invalid Email Confirmation Request");

        return Ok();
    }
    private async Task<bool> UserExists(string username)
    {
        return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
    }

    [HttpPost("ExternalLogin")]
    public async Task<ActionResult<UserDto>> ExternalLogin([FromBody] ExternalAuthDto externalAuth)
    {
        var payload = await _tokenService.VerifyGoogleToken(externalAuth);
        if (payload == null)
            return BadRequest("Invalid External Authentication.");
        var info = new UserLoginInfo(externalAuth.Provider, payload.Subject, externalAuth.Provider);
        var user = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);
        if (user == null)
        {
            user = await _userManager.FindByEmailAsync(payload.Email);
            if (user == null)
            {
                var photo = new Photo
                {
                    Url = payload.Picture,
                    IsMain = true
                };
                user = new AppUser
                {
                    Email = payload.Email,
                    UserName = payload.GivenName,
                    //DateOfBirth = DateTime.MinValue,
                    KnownAs = payload.GivenName,
                    // Photos = new Photo {
                    //     Url= payload.Picture,
                    //     IsMain = true
                    // }
                    Photos = { photo }
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
            KnownAs = user.KnownAs,
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