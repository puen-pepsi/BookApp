import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Chapter } from '../_models/chapter';
import { ChapterList } from '../_models/chapterlist';
import { LazyLoadParams } from '../_models/lazyLoadParams';
import { ShowHistory } from '../_models/ShowHIstory';
import { ShowStory } from '../_models/showstory';
import { ShowStoryViews } from '../_models/showstoryviews';
import { StoryParams } from '../_models/storyParams';
import { User } from '../_models/user';
import { Userhistory } from '../_models/userhistory';
import { UserLiked } from '../_models/userLiked';
import { ViewsParams } from '../_models/viewsparams';
import { AccountService } from '../_services/account.service';
import { getPaginatedResult, getPaginationHeaders } from '../_services/paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class ShowStoryService {
  baseUrl = environment.apiUrl;
  showStories : ShowStory[] = [];
  showStory : ShowStory;
  showStoryCache = new Map();
  user :User;
  storyParams:StoryParams;
  viewsParams:ViewsParams;
  list : Chapter[];
  constructor(private http:HttpClient,private accountService:AccountService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.storyParams = new StoryParams(user);
      this.viewsParams = new ViewsParams(user);
    })
  }
  getStoryParams(init:string){
    this.storyParams.storyType=init;
    this.storyParams.pageNumber = 1;
    return this.storyParams;
  }
  setStoryParams(params: StoryParams){
    this.storyParams = params;
  }
  resetStoryParams(){
    this.storyParams = new StoryParams(this.user);
    return this.storyParams;
  }
  getViewsParams(){
    return this.viewsParams;
  }
  setViewsParams(params: ViewsParams){
    this.viewsParams = params;
  }
  resetViewsParams(){
    this.viewsParams = new ViewsParams(this.user);
    return this.viewsParams;
  }
  getShowStoryViews(viewsParams:ViewsParams){
    let params = getPaginationHeaders(viewsParams.pageNumber,viewsParams.pageSize);
        params = params.append('orderByViews',viewsParams.orderByViews);
    return getPaginatedResult<ShowStoryViews[]>(this.baseUrl + 'showstory/getviews',params,this.http)
        .pipe(map(response =>{
          return(response );
        }))

  }
  getShowStoryLazyLoad(lazyLoad:LazyLoadParams){
    return this.http.get<ShowStory[]>(this.baseUrl+'showstory/getStoryLazyLoad/'
              +lazyLoad.currentItem+'/'+lazyLoad.takeSize+'/'+lazyLoad.storyType);
  }
  getShowStoryRandom(takesize:number){
    return this.http.get<ShowStory[]>(this.baseUrl+'showstory/getStoryRandom/'+takesize);
  }
  getShowStory(StoryParams:StoryParams){
    var response = this.showStoryCache.get(Object.values(StoryParams).join('-'));
    if(response){
      return of(response);
    }
    let params = getPaginationHeaders(StoryParams.pageNumber,StoryParams.pageSize);
        params = params.append('genre',StoryParams.genre.toString());
        params = params.append('language',StoryParams.language.toString());
    // params = params.append('author',StoryParams.author.toString());
        params = params.append('storyType',StoryParams.storyType.toString());
        params = params.append('orderBy',StoryParams.orderBy);
        params = params.append('search',StoryParams.search);
    return getPaginatedResult<ShowStory[]>(this.baseUrl+'showstory',params,this.http)
        .pipe(map(response => {
          //console.log(response);
          this.showStoryCache.set(Object.values(StoryParams).join('-'),response);
          
          return response;
        }))
  }
  getStory(storyId:number){
    // const member = this.members.find(x=>x.username === username);
    // if(member !== undefined) return of(member);
    const story = [...this.showStoryCache.values()]
      .reduce((arr,elem)=> arr.concat(elem.result),[])
      .find((showStory:ShowStory)=> showStory.storyId === storyId);

      if(story){
        return of(story);
      }
    return this.http.get<ShowStory>(this.baseUrl + 'showstory/' + storyId);
  }
  getStoryName(storyName:string){
    const showstory = [...this.showStoryCache.values()]
      .reduce((arr,elem)=> arr.concat(elem.result),[])
      .find((showStory:ShowStory)=> showStory.storyName===storyName);
      if(showstory){
        return of(showstory);
      }
      
      return this.http.get<ShowStory>(this.baseUrl+'showstory/'+storyName);
  }
  getStoryChapter(storyId:number,published:boolean){
    this.http.get(this.baseUrl + 'story/'+ storyId +'/chapter/GetChapters/'+published)
      .toPromise()
      .then(res => this.list = res as Chapter[]);
  }
  getStoryNameChapter(storyName:string){
    return this.http.get<Chapter[]>(this.baseUrl + 'story/'+ storyName +'/chapters')
      // .toPromise()
      // .then(res => this.list = res as Chapter[]);
  }
  getChapterLazy(storyName:string,currentChapter:number,pageSize:number){
    return this.http.get<Chapter[]>(this.baseUrl + 'chapters/getchapters/' +storyName+ '/'
        +currentChapter+'/'+pageSize);
  }
  getChapterLazyUp(storyName:string,currentChapter:number,pageSize:number){
    return this.http.get<Chapter[]>(this.baseUrl + 'chapters/getchaptersup/' +storyName+ '/'
        +currentChapter+'/'+pageSize);
  }
  getChapterList(storyName:string,countSize:number,pageSize:number){
    return this.http.get<ChapterList[]>(this.baseUrl + 'chapters/getchapterlist/'+ storyName +'/'+countSize+'/'+pageSize);
      // .toPromise()
      // .then(res => this.list = res as Chapter[]);
  }
  getChapterRecent(){
    return this.http.get<Chapter[]>(this.baseUrl+'chapters/getrecentchapter');
  }
  getGenreList(){
    return this.http.get<any[]>(this.baseUrl + 'story/GetAllGenre');
  }
  getLanguageList(){
    return this.http.get<any[]>(this.baseUrl + 'story/GetAllLanguage');
  }
  getPostRate(rate:number,story:ShowStory){
    //console.log(rate);
    return this.http.post<ShowStory>(this.baseUrl+'story/RateStory/'+story.storyId+'/'+rate,null).pipe(
      map(res => {
        //console.log(res)
        const index = this.showStories.indexOf(story);
        this.showStories[index] = res;
        console.log(this.showStories[index])
        return this.showStories[index];
      })
    );
  }
  getYouRate(storyId:number){
    return this.http.get(this.baseUrl + 'story/GetRateStory/'+storyId);
  }
  getAddViews(storyName:string){
    return this.http.put(this.baseUrl + 'showstory/'+storyName,null);
  }
  addLikeStory(storyname:string){
    return this.http.post(this.baseUrl +'likestories/' + storyname,{});
  }
  addLikeChapter(id:number){
    return this.http.post(this.baseUrl+'chapters/addlike/'+id,{});
  }
  getStoryLikes(pageNumber,pageSize){
    let params = getPaginationHeaders(pageNumber,pageSize);
    return getPaginatedResult<Partial<ShowStory[]>>(this.baseUrl +'likestories',params,this.http);
  }
  getStoryHistory(pageNumber,pageSize){
    let params = getPaginationHeaders(pageNumber,pageSize);
    return getPaginatedResult<Partial<ShowHistory[]>>(this.baseUrl + 'historyUser',params,this.http)
  }

  getStoryTag(tagname:string){
    return this.http.get<Partial<ShowStory[]>>(this.baseUrl+'tags/taglist/'+ tagname);
  }
  postReport(model:any){
    return this.http.post(this.baseUrl + 'report',model);
  }
  addHistoryUser(storyname:string,target:string){
    return this.http.post(this.baseUrl+'historyUser/'+storyname+'/'+target,{});
  }
  getStorybyName(storyname:string){
    return this.http.get<ShowStory>(this.baseUrl+'showstory/'+storyname,{});
  }
  getUserHistory(storyId:number){
    return this.http.get<Userhistory>(this.baseUrl+'historyUser/'+storyId,{});
  }
  getStoryAuthor(pageNumber,pageSize,authorname:string){
    let params = getPaginationHeaders(pageNumber,pageSize);
    params = params.append('authorName',authorname);
    return getPaginatedResult<Partial<ShowStory[]>>(this.baseUrl+'showstory/GetStoryAuthor/',params,this.http);
  }
  getUserLiked(storyId:number){
    return this.http.get<UserLiked>(this.baseUrl+'likestories/'+storyId,{});
  }

  deletHistoryUser(storyId:number){
    return this.http.delete(this.baseUrl+'historyUser/'+storyId,{});
  }
  deleteStoryLike(storyId:number){
    return this.http.delete(this.baseUrl+'likeStories/'+storyId,{});
  }
  
}