using System;
using System.Linq;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src =>
                    src.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.BannerUrl, opt => opt.MapFrom(src =>
                    src.Banners.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Point, opt => opt.MapFrom(src => src.recievePoints.Sum(s => s.Point)))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => 
                    src.titleAcitive.FirstOrDefault(x => x.IsMain).Name))
                .ForMember(dest => dest.TitleActives,opt => opt.MapFrom(src => src.titleAcitive.OrderByDescending(s => s.TitleCreated)))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotoDto>();
            CreateMap<Banner,BannerDto>();
            CreateMap<News, NewsDto>().ReverseMap();
            CreateMap<News, NewsShowDto>()
                //.ForMember(dest => dest.PictureUrl,ex=>ex.MapFrom(src => string.IsNullOrEmpty(src.PictureUrl) ? src.PictureUrl : "https://localhost:5001/Resources/" + src.PictureUrl))
                .ForMember(dest => dest.UserName, ex => ex.MapFrom(src => src.UserNews.KnownAs))
                .ForMember(dest => dest.UserPhoto, ex => ex.MapFrom(src => src.UserNews.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<MemberUpdateDto, AppUser>();
            CreateMap<RegisterDto, AppUser>();
            CreateMap<Message, MessageDto>()
                .ForMember(dest => dest.SenderPhotoUrl, opt => opt.MapFrom(src =>
                    src.Sender.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.RecipientPhotoUrl, opt => opt.MapFrom(src =>
                    src.Recipient.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<MessageDto, Message>();
            CreateMap<ChatMessage, ChatMessageDto>()
                .ForMember(dest => dest.UserName, ex => ex.MapFrom(src => src.UserChat.UserName))
                .ForMember(dest => dest.KnownAs, ex => ex.MapFrom(src => src.UserChat.KnownAs))
                .ForMember(dest => dest.Image, ex => ex.MapFrom(src => src.UserChat.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<Tag, TagDto>().ReverseMap();
            CreateMap<StoryDto, Story>()
                .ForMember(src => src.Id, opt => opt.Ignore());
            CreateMap<Rating, RatingDto>().ReverseMap();
            CreateMap<PhotoStory, PhotoStoryResource>();
            CreateMap<StoryChapterDto, StoryChapter>();
            CreateMap<StoryChapter, StoryChapterDto>()
                .ForMember(d => d.LikeChapter, o => o.MapFrom(s => s.LikeChapters.Select(x => x.UserActive.UserName)))
                .ForMember(dest => dest.StoryName, ex => ex.MapFrom(src => src.Story.StoryName))
                .ForMember(dest => dest.ImageUrl, ex => ex.MapFrom(src => src.Story.ImageUrl))
                .ForMember(dest => dest.AuthorName, ex => ex.MapFrom(src => src.Story.Author.UserName))
                .ForMember(dest => dest.AuthorImageUrl,
                    ex => ex.MapFrom(src => src.Story.Author.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<StoryChapter, ChapterListDto>();
            CreateMap<Published, PublishedDto>().ReverseMap();
            CreateMap<Story, StoryDto>()
                .ForMember(dest => dest.UserName, ex => ex.MapFrom(src => src.Author.KnownAs))
                // .ForMember(dest => dest.Title, opt => opt.MapFrom(src => 
                //     src.Author.titleAcitive.FirstOrDefault(x => x.IsMain).Name))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => 
                    src.Author.Title))
                .ForMember(dest => dest.UserPhoto, ex => ex.MapFrom(src => src.Author.Photos.FirstOrDefault(x => x.IsMain).Url))
                // .ForMember(dest => dest.Point, ex => ex.MapFrom(src => src.Author.recievePoints.Sum(x => x.Point)))
                .ForMember(dest => dest.Point, ex => ex.MapFrom(src => src.Author.Point))
                .ForMember(dest => dest.LastChapterName, 
                             opt => {
                                opt.PreCondition(src => (src.Chapters.Count() > 0));
                                opt.MapFrom(src =>  src.Chapters.OrderByDescending(x => x.Order).First().ChapterName);   
                            })
                .ForMember(dest => dest.LastChapterCreate, 
                             opt => {
                                opt.PreCondition(src => (src.Chapters.Count() > 0));
                                opt.MapFrom(src =>  src.Chapters.OrderByDescending(x => x.Order).First().Published.Created);   
                            })
                // .ForMember(dest => dest.LastChapter, 
                //             opt => {
                //                 opt.PreCondition(src => (src.Chapters.Count() > 0));
                //                 opt.MapFrom(src =>  src.Chapters.OrderByDescending(x => x.Order).First());   
                //             })
                // .ForMember(dest => dest.ImageUrl,ex=>ex.MapFrom(src => src.ImageUrl.GetUrl() ))
                //.ForMember(dest => dest.ImageUrl,ex=>ex.MapFrom<ImageUrlResolver>())
                //.ForMember(dest => dest.ImageUrl,ex=>ex.MapFrom(src => "https://rainobunew.azurewebsites.net/Resources/" + src.ImageUrl ))
                //.ForMember(dest => dest.ImageUrl,ex=>ex.MapFrom(src => string.IsNullOrEmpty(src.ImageUrl) ? src.ImageUrl : "https://localhost:5001/Resources/" + src.ImageUrl))
                //.ForMember(dest => dest.ImageUrl,ex=>ex.MapFrom(src => src.ImageUrl ))
                .ForMember(dest => dest.GetState, opt => opt.MapFrom(src => src.Created.GetState(src.State)))
                // .ForMember(dest => dest.LastChapter, opt => opt.MapFrom(src => src.Chapters.OrderByDescending(x => x.Order)
                //                 .Select(x => x.ChapterName).Take(1)))
                .ForMember(dest => dest.Views, ex => ex.MapFrom(src => src.ViewCount.Count))
                .ForMember(dest => dest.StoryId, ex => ex.MapFrom(src => src.Id))
                .ForMember(dest => dest.TotalRate,
                    ex => ex.MapFrom(sr => sr.Ratings.Count() == 0 ? 0 : sr.Ratings.Count()))
                .ForMember(dest => dest.Rating,
                    ex => ex.MapFrom(sr => sr.Ratings.Count() == 0 ? 0 : sr.Ratings.Average(src => src.Rated)))
                .ForMember(dest => dest.TotalChapter,
                    ex => ex.MapFrom(src => src.Chapters
                            .Where(src => src.Published.Created > DateTime.MinValue).Count() == 0 ? 0 : src.Chapters
                            .Where(src => src.Published.Created > DateTime.MinValue).Count()));
            CreateMap<StoryComment, StoryCommentDto>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.UserPost.UserName))
                .ForMember(d => d.KnownAs, o => o.MapFrom(s => s.UserPost.KnownAs))
                .ForMember(d => d.liked, o => o.MapFrom(s => s.Liked.Select(x => x.UserLikeComment.UserName)))
                .ForMember(dest => dest.Point, ex => ex.MapFrom(src => src.UserPost.recievePoints.Sum(x => x.Point)))
                .ForMember(dest => dest.Title, ex => ex.MapFrom(src => 
                    src.UserPost.titleAcitive.FirstOrDefault(x=> x.IsMain).Name))
                //.ForMember(dest => dest.Rank,ex => ex.MapFrom<RankCommentResolver>())
                .ForMember(dest => dest.Image, ex => ex.MapFrom(src => src.UserPost.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<Story, HistoryStoryDto>()
                .ForMember(dest => dest.storyId, ex => ex.MapFrom(s => s.Id))
                .ForMember(dest => dest.CreateAt, ex => ex.MapFrom(s => s.Created))
                .ForMember(dest => dest.UserPhoto, ex => ex.MapFrom(src => src.Author.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Rating,
                    ex => ex.MapFrom(sr => sr.Ratings.Count() == 0 ? 0 : sr.Ratings.Average(src => src.Rated)))
                .ForMember(dest => dest.TotalRate,
                    ex => ex.MapFrom(sr => sr.Ratings.Count() == 0 ? 0 : sr.Ratings.Count()))
                .ForMember(dest => dest.Rating,
                    ex => ex.MapFrom(sr => sr.Ratings.Count() == 0 ? 0 : sr.Ratings.Average(src => src.Rated)))
                .ForMember(dest => dest.TotalChapter,
                    ex => ex.MapFrom(src => src.Chapters.Where(src => src.Published.Created > DateTime.MinValue)
                          .Count() == 0 ? 0 : src.Chapters
                              .Where(src => src.Published.Created > DateTime.MinValue)
                              .Count()))
                .ForMember(dest => dest.fregment, ex => ex.MapFrom(s => s.StoryHistory.FirstOrDefault(x => x.SourceUserId == s.Id).fregment))
                .ForMember(dest => dest.Created, ex => ex.MapFrom(s => s.StoryHistory.FirstOrDefault(x => x.HistoryStoryId == s.Id).Created))
;
            CreateMap<UserHistory, UserHistoryDto>().ReverseMap();
            CreateMap<TitleActive,TitleActiveDto>()
                .ForMember(dest => dest.TitleCreate,ex => ex.MapFrom(src => src.TitleCreated))
                .ForMember(dest => dest.Name,ex => ex.MapFrom(src => src.Name));
            CreateMap<RecievePoint,RecievePointDto>()
                .ForMember(dest => dest.ActivitiesCreated,ex => ex.MapFrom(src => src.Activities.ActivitiesCreate))  
                .ForMember(dest => dest.UserName,ex => ex.MapFrom(src => src.Activities.UserActive.KnownAs)) 
                .ForMember(dest => dest.StoryName,ex => ex.MapFrom(src => src.Activities.story.StoryName)) 
                .ForMember(dest => dest.Type,ex => ex.MapFrom(src => src.Activities.Type)) 
                .ForMember(dest => dest.Point,ex => ex.MapFrom(src => src.Point));
            CreateMap<Report,ReportDto>()
                .ForMember(dest => dest.UserName,ex => ex.MapFrom(src => src.User.UserName));  

            CreateMap<VipUser,VipUserDto>()
                .ForMember(dest => dest.UserName,ex => ex.MapFrom(src => src.UserVip.UserName));
        }
    }
}