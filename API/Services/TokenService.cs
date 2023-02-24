using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;
        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration _config;
        private readonly IConfigurationSection _goolgeSettings;
        public TokenService(IConfiguration config, UserManager<AppUser> userManager)
        {
            _config = config;
            _userManager = userManager;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
            _goolgeSettings = _config.GetSection("GoogleAuthSettings");
        }

        public async Task<string> CreateToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
            };

            var roles = await _userManager.GetRolesAsync(user);

            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(2),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }




        public async Task<GoogleJsonWebSignature.Payload> VerifyGoogleToken(ExternalAuthDto externalAuth)
        {
                try
                {
                    var settings = new GoogleJsonWebSignature.ValidationSettings()
                    {
                        Audience = new List<string>() { _goolgeSettings.GetSection("clientId").Value }
                    };
                    var payload = await GoogleJsonWebSignature.ValidateAsync(externalAuth.IdToken, settings);
                    return payload;
                }catch(Exception){
                
                    return null;
                }
        }
    public  RefreshToken GenerateRefreshToken()
    {
        var randomNumber = new byte[64];
        string newToken = "";
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(randomNumber);
            newToken =  Convert.ToBase64String(randomNumber);
        }
        var refreshToken = new RefreshToken
        {
            
            Token = newToken,
            Expires = DateTime.UtcNow.AddDays(2),
            Created = DateTime.UtcNow
            
        };

        return  refreshToken;
    }


        // private void SetRefreshToken(RefreshToken newRefreshToken)
        // {
        //     var cookieOptions = new CookieOptions
        //     {
        //         HttpOnly = true,
        //         Expires = newRefreshToken.Expires
        //     };
        //     Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);

        // user.RefreshToken = newRefreshToken.Token;
        // user.TokenCreated = newRefreshToken.Created;
        // user.TokenExpires = newRefreshToken.Expires;
        // user.RefreshToken = newRefreshToken.Token;
        // user.RefreshTokenExpiryTime = newRefreshToken.Expires;

        // }

    }
}