using System.Linq;
using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class RankCommentResolver : IValueResolver<StoryComment, StoryCommentDto, string>
    {
        private readonly DataContext _context;
        public RankCommentResolver(DataContext context)
        {
            _context = context;
        }

        public string Resolve(StoryComment source, StoryCommentDto destination, string destMember, ResolutionContext context)
        {
            var allRank = _context.Ranks.ToList();
            int max = allRank[0].MaxPoint;
            for(int i=0; i < allRank.Count;i++){
                if(source.UserPost.recievePoints.Sum(s => s.Point) < allRank[i].MaxPoint){
                    return allRank[i].Name;
                }
            }
            return allRank[allRank.Count-1].Name;
        }
    }
}