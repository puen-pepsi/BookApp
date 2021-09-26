using System;
using System.Linq.Expressions;
using API.Entities;

namespace API.Specifications
{
    public class MemberWithFilterCount : BaseSpecifcation<AppUser>
    {
        public MemberWithFilterCount(MemberSpecParams memberSpecParams) 
         : base(x => (string.IsNullOrEmpty(memberSpecParams.Search) || x.UserName.ToLower().Contains(memberSpecParams.Search))
         )
        {
        }
    }
}