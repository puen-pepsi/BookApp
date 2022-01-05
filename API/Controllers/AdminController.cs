using System;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AdminController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        public AdminController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }
        [HttpGet("user-with-roles/{username}")]
        public async Task<ActionResult> GetUserWithRoles(string username)
        {
            var users = await _userManager.Users
                .Include(r => r.UserRoles)
                .ThenInclude(r => r.Role)
                .Where(u => u.UserName.ToLower() == username.ToLower())
                .Select(u => new
                {
                    u.Id,
                    Username = u.UserName,
                    Roles = u.UserRoles.Select(r => r.Role.Name).ToList()
                })
                .FirstOrDefaultAsync();

            return Ok(users);
        }
        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("users-with-roles")]
        public async Task<ActionResult> GetUsersWithRoles()
        {
            var users = await _userManager.Users
                .Include(r => r.UserRoles)
                .ThenInclude(r => r.Role)
                .OrderBy(u => u.UserName)
                .Select(u => new
                {
                    u.Id,
                    Username = u.UserName,
                    Roles = u.UserRoles.Select(r => r.Role.Name).ToList()
                })
                .ToListAsync();

            return Ok(users);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("edit-roles/{username}")]
        public async Task<ActionResult> EditRoles(string username, [FromQuery] string roles)
        {
            var selectedRoles = roles.Split(",").ToArray();

            var user = await _userManager.FindByNameAsync(username);

            if (user == null) return NotFound("Could not find user");

            var userRoles = await _userManager.GetRolesAsync(user);

            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if (!result.Succeeded) return BadRequest("Failed to add to roles");

            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!result.Succeeded) return BadRequest("Failed to remove from roles");

            return Ok(await _userManager.GetRolesAsync(user));
        }
        [HttpPost("add-vip-role/{username}")]
        public async Task<ActionResult> AddVIPRole(string username)
        {
            string[] selectrole = {"VIP"};
            var user = await _userManager.Users
                        .Include(x => x.VipUsers)
                        .SingleOrDefaultAsync(x => x.UserName == username);

            if (user == null) return NotFound("Could not find user");

            var userRoles = await _userManager.GetRolesAsync(user);
            //check vip already

            //Add days Expire
            var result = await _userManager.AddToRolesAsync(user, selectrole.Except(userRoles));
            
            if (!result.Succeeded) return BadRequest("Failed to add VIP to roles");
                var vipuser = new VipUser{
                UserVip = user,
                UserVipId = user.Id,
                Amount = 5,
                Description ="5$ for 30 Days"
            };
            if(userRoles.Contains(selectrole[0])){
                //get expired date + 30days
                vipuser.ExpiredDate =  user.VipUsers.Max(x => x.ExpiredDate).AddDays(30);
            }else{
                vipuser.ExpiredDate =  DateTime.Now.AddDays(30);
            }
            user.VipUsers.Add(vipuser);
            var resultx = await _userManager.UpdateAsync(user);
            if(!resultx.Succeeded) return BadRequest("Failed to add VIP details");

            return Ok(user);
        }
        [HttpGet("get-vip-expired/{username}")]
        public async Task<ActionResult> getVipExpiredDate(string username){
             var user = await _userManager.Users
                        .Include(x => x.VipUsers)
                        .SingleOrDefaultAsync(x => x.UserName == username);
            var expireddate = user.VipUsers.Max(x => x.ExpiredDate);
            return Ok(expireddate);
        }
        [HttpDelete("delete-vip-role/{username}")]
        public async Task<ActionResult> DeleteVIP(string username){

            // string[] selectrole = {"Admin"};

            var user = await _userManager.FindByNameAsync(username);

            if (user == null) return NotFound("Could not find user");

            var result = await _userManager.RemoveFromRoleAsync(user,"Admin");

            if (!result.Succeeded) return BadRequest("Failed to remove from roles");

            return Ok(await _userManager.GetRolesAsync(user));
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("photos-to-moderate")]
        public ActionResult GetPhotosForModeration()
        {
            return Ok("Admins or moderators can see this");
        }
    }
}