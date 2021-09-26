using System;
using System.Linq.Expressions;
using API.Entities;

namespace API.Specifications
{
    public class MemberWithRank : BaseSpecifcation<AppUser>
    {
        public MemberWithRank(MemberSpecParams memberSpecParams)
         : base(x => (string.IsNullOrEmpty(memberSpecParams.Search) || x.UserName.ToLower().Contains(memberSpecParams.Search)) 
         )
        {
            AddInclude(x => x.recievePoints);
            AddInclude(x => x.titleAcitive);
            AddInclude(x => x.Photos);
            AddOrderBy(x => x.LastActive);
            ApplyPaging(memberSpecParams.PageSize * (memberSpecParams.PageIndex - 1), memberSpecParams.PageSize);

            if (!string.IsNullOrEmpty(memberSpecParams.Sort))
            {
                switch (memberSpecParams.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(p => p.Created);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(p => p.LastActive);
                        break;
                    default:
                        AddOrderBy(n => n.LastActive);
                        break;
                }
            }
        }

        public MemberWithRank(int id) : base(x => x.Id  == id)
        {
            AddInclude(x => x.recievePoints);
            AddInclude(x => x.Photos);
        }
    }
   
}