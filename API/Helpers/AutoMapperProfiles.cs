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
            CreateMap<StoryChapterDto,StoryChapter>();
            CreateMap<StoryChapter,StoryChapterDto>()
                .ForMember(dest => dest.AuthorName,ex=>ex.MapFrom(src => src.Story.Author.UserName))
                .ForMember(dest => dest.AuthorImageUrl,
                    ex => ex.MapFrom(src=>src.Story.Author.Photos.FirstOrDefault(x=>x.IsMain).Url));
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
                .ForMember(d => d.KnownAs,o => o.MapFrom(s => s.UserPost.UserName))
                .ForMember(d => d.liked , o => o.MapFrom(s => s.Liked.Select(x => x.UserActive.UserName)))
                .ForMember(dest=>dest.Image,ex=>ex.MapFrom(src=>src.UserPost.Photos.FirstOrDefault(x=>x.IsMain).Url));
            CreateMap<Story,HistoryStoryDto>()
                .ForMember(dest => dest.storyId, ex => ex.MapFrom(s => s.Id))
                .ForMember(dest => dest.CreateAt, ex => ex.MapFrom(s => s.Created))
                .ForMember(dest=> dest.UserPhoto,ex=>ex.MapFrom(src=>src.Author.Photos.FirstOrDefault(x=>x.IsMain).Url))
                .ForMember(dest=> dest.Rating,
                    ex=>ex.MapFrom(sr=> sr.Ratings.Count()==0 ? 0:sr.Ratings.Average(src=> src.Rated)))
                .ForMember(dest=> dest.TotalRate,
                    ex=>ex.MapFrom(sr=> sr.Ratings.Count()==0 ? 0 :sr.Ratings.Count()))
                .ForMember(dest=> dest.Rating,
                    ex=>ex.MapFrom(sr=> sr.Ratings.Count()==0 ? 0:sr.Ratings.Average(src=> src.Rated)))
                .ForMember(dest => dest.TotalChapter, 
                    ex=>ex.MapFrom(src=>src.Chapters.Where(src=>src.Published.Created > DateTime.MinValue)
                        .Count()==0?0:src.Chapters
                            .Where(src=>src.Published.Created > DateTime.MinValue)
                            .Count()))
                .ForMember(dest => dest.fregment,ex => ex.MapFrom(s => s.StoryHistory.FirstOrDefault(x=>x.SourceUserId== s.Id ).fregment)) 
                .ForMember(dest => dest.Created,ex => ex.MapFrom(s => s.StoryHistory.FirstOrDefault(x=>x.HistoryStoryId== s.Id).Created))
;
            CreateMap<UserHistory,UserHistoryDto>().ReverseMap();
            // CreateMap<Activities,ActivitiesDto>()
            //     .ForMember(dest => dest.UserName, ex => ex.MapFrom(s => s.UserActive.UserName));
            // CreateMap<UserHistory,HistoryStoryDto>()
            //     .ForMember(dest => dest.storyId, ex => ex.MapFrom(s => s.HistoryStoryId))
            //     .ForMember(dest => dest.CreateAt, ex => ex.MapFrom(s => s.HistoryStory.Created))
            //    .ForMember(dest=> dest.UserPhoto,ex=>ex.MapFrom(src=>src.HistoryStory.Author.Photos.FirstOrDefault(x=>x.IsMain).Url))
               
            //     .ForMember(dest => dest.fregment,ex => ex.MapFrom(s => s.fregment))
            //     .ForMember(dest => dest.Created,ex => ex.MapFrom(s => s.Created))
            //      .ForMember(dest=> dest.Rating,
            //         ex=>ex.MapFrom(sr=> sr.HistoryStory.Ratings.Count()==0 ? 0:sr.HistoryStory.Ratings.Average(src=> src.Rated)))
            //     .ForMember(dest=> dest.TotalRate,
            //         ex=>ex.MapFrom(sr=> sr.HistoryStory.Ratings.Count()==0 ? 0 :sr.HistoryStory.Ratings.Count()))
            //     .ForMember(dest => dest.TotalChapter, 
            //         ex=>ex.MapFrom(src=>src.HistoryStory.Chapters.Where(src=>src.Published.Created > DateTime.MinValue)
            //             .Count()==0?0:src.HistoryStory.Chapters
            //                 .Where(src=>src.Published.Created > DateTime.MinValue)
            //                 .Count()));

        }
    }
}