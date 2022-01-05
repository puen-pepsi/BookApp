using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<Report>> GetAllReport()
        {
            return await _context.Reports.Include(e => e.User).ToListAsync();
        }

        public async Task<IEnumerable<VipUserDto>> GetAllVipUser()
        {
            return await     _context.VipUsers
                                .Include(v => v.UserVip)
                                .ProjectTo<VipUserDto>(_mapper.ConfigurationProvider)
                                .ToListAsync();
        }

        public async Task<MemberDto> GetMemberAsync(string username)
        {
            return await _context.Users
                .Where(x => x.UserName == username)
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams)
        {
            var query = _context.Users.AsQueryable();

            query = query.Where(u => u.UserName != userParams.CurrentUsername);
            //query = query.Where(u => u.Gender == userParams.Gender);

            // var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
            // var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

            //query = query.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);

            query = userParams.OrderBy switch
            {
                "created" => query.OrderByDescending(u => u.Created),
                _ => query.OrderByDescending(u => u.LastActive)
            };
            //var users = _mapper.Map<IEnumerable<MemberDto>>(query);
            return await PagedList<MemberDto>.CreateAsync(query.ProjectTo<MemberDto>(_mapper
                .ConfigurationProvider).AsNoTracking(), 
                    userParams.PageNumber, userParams.PageSize);
   
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users
                            .Include(u => u.recievePoints)
                            .Include(t => t.titleAcitive).ThenInclude(t => t.TitleName)
                            .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<AppUser> GetUserByKnowAs(string knowas,string username)
        {
            return await _context.Users
            .Where(x => x.UserName != username)
            .SingleOrDefaultAsync(x => x.KnownAs == knowas.Trim());
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(p => p.Banners)
                .Include(p => p.Photos)
                .Include(p => p.recievePoints)
                .Include(p => p.titleAcitive)
                .SingleOrDefaultAsync(x => x.UserName == username);
        }

        // public async Task<string> GetUserGender(string username)
        // {
        //     return await _context.Users
        //         .Where(x => x.UserName == username)
        //         .Select(x => x.Gender).FirstOrDefaultAsync();
        // }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
                .Include(p => p.Photos)
                .ToListAsync();
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }

        
    }
}