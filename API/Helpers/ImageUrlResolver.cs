using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    public class ImageUrlResolver : IValueResolver<Story, StoryDto, string>
    {
        private readonly IConfiguration _config;
        public ImageUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(Story source, StoryDto destination, string destMember, ResolutionContext context)
        {   
            if (!string.IsNullOrEmpty(source.ImageUrl))
            {
                return _config["ApiUrl"] + source.ImageUrl;
            }
            return null;
        }

    }
}