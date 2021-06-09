using System;
using System.Linq;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => 
                    src.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotoDto>();
            CreateMap<MemberUpdateDto, AppUser>();
            CreateMap<RegisterDto, AppUser>();
            CreateMap<Message, MessageDto>()
                .ForMember(dest => dest.SenderPhotoUrl, opt => opt.MapFrom(src => 
                    src.Sender.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.RecipientPhotoUrl, opt => opt.MapFrom(src => 
                    src.Recipient.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<MessageDto, Message>();
            CreateMap<Tag,TagDto>().ReverseMap();
            CreateMap<StoryDto,Story>()
                .ForMember(src => src.Id,opt => opt.Ignore());
            CreateMap<Rating,RatingDto>().ReverseMap();
            CreateMap<PhotoStory, PhotoStoryResource>();
            CreateMap<StoryChapterDto,StoryChapter>().ReverseMap();
            CreateMap<Published,PublishedDto>().ReverseMap();
            CreateMap<Story,StoryDto>()
                .ForMember(dest=> dest.UserPhoto,ex=>ex.MapFrom(src=>src.Author.Photos.FirstOrDefault(x=>x.IsMain).Url))
                .ForMember(dest => dest.StoryId,ex => ex.MapFrom(src => src.Id))
                .ForMember(dest=> dest.TotalRate,
                    ex=>ex.MapFrom(sr=> sr.Ratings.Count()==0 ? 0 :sr.Ratings.Count()))
                .ForMember(dest=> dest.Rating,
                    ex=>ex.MapFrom(sr=> sr.Ratings.Count()==0 ? 0:sr.Ratings.Average(src=> src.Rated)))
                .ForMember(dest => dest.TotalChapter, 
                    ex=>ex.MapFrom(src=>src.Chapters.Where(src=>src.Published.Created > DateTime.MinValue)
                        .Count()==0?0:src.Chapters
                            .Where(src=>src.Published.Created > DateTime.MinValue)
                            .Count()));
            CreateMap<StoryComment,StoryCommentDto>()
                .ForMember(d => d.UserName,o => o.MapFrom(s => s.UserPost.UserName))
                .ForMember(d => d.KnownAs,o => o.MapFrom(s => s.UserPost.KnownAs))
                .ForMember(dest=>dest.Image,ex=>ex.MapFrom(src=>src.UserPost.Photos.FirstOrDefault(x=>x.IsMain).Url));
                
        }
    }
}