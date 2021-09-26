using System.Collections.Generic;
using System.Linq;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.Configuration;
using Microsoft.AspNetCore.Http;

namespace API.Helpers
{
    public class RankResolver : IValueResolver<AppUser, MemberDto, string>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly DataContext _context;
        public RankResolver( DataContext context)
        {
            _context = context;
        }
        public string Resolve(AppUser source, MemberDto destination, string destMember, ResolutionContext context)
        {
            var allRank = _context.Ranks.ToList();
            int max = allRank[0].MaxPoint;
            for(int i=0; i < allRank.Count;i++){
                if(source.recievePoints.Sum(s => s.Point) < allRank[i].MaxPoint){
                    return allRank[i].Name;
                }
            }
            return allRank[allRank.Count-1].Name;
        }
    }
}