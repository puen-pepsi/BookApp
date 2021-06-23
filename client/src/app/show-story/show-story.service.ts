import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Chapter } from '../_models/chapter';
import { ShowHistory } from '../_models/ShowHIstory';
import { ShowStory } from '../_models/showstory';
import { StoryParams } from '../_models/storyParams';
import { User } from '../_models/user';
import { Userhistory } from '../_models/userhistory';
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
  list : Chapter[];
  constructor(private http:HttpClient,private accountService:AccountService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.storyParams = new StoryParams(user);
    })
  }
  getStoryParams(){
    return this.storyParams;
  }
  setStoryParams(params: StoryParams){
    this.storyParams = params;
  }
  resetStoryParams(){
    this.storyParams = new StoryParams(this.user);
    return this.storyParams;
  }
  getShowStory(StoryParams:StoryParams){
    var response = this.showStoryCache.get(Object.values(StoryParams).join('-'));
    if(response){
      return of(response);
    }
    let params = getPaginationHeaders(StoryParams.pageNumber,StoryParams.pageSize);
        params = params.append('genre',StoryParams.genre.toString());
    // params = params.append('author',StoryParams.author.toString());
        params = params.append('orderBy',StoryParams.orderBy);
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
  getGenreList(){
    return this.http.get(this.baseUrl + 'story/GetAllGenre');
  }
  getPostRate(rate:number,storyId:number){
    console.log(rate);
    return this.http.post(this.baseUrl+'story/RateStory/'+storyId+'/'+rate,null,{responseType:'text'});
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
  getStoryLikes(pageNumber,pageSize){
    let params = getPaginationHeaders(pageNumber,pageSize);
    return getPaginatedResult<Partial<ShowStory[]>>(this.baseUrl +'likestories',params,this.http);
  }
  getStoryHistory(pageNumber,pageSize){
    let params = getPaginationHeaders(pageNumber,pageSize);
    return getPaginatedResult<Partial<ShowHistory[]>>(this.baseUrl + 'HistoryUser',params,this.http)
  }

  addHistoryUser(storyname:string,target:string){
    return this.http.post(this.baseUrl+'HistoryUser/'+storyname+'/'+target,{});
  }
  getStorybyName(storyname:string){
    return this.http.get<ShowStory>(this.baseUrl+'showstory/'+storyname,{});
  }
  getUserHistory(storyId:number){
    return this.http.get<Userhistory>(this.baseUrl+'HistoryUser/'+storyId,{});
  }
  getStoryAuthor(pageNumber,pageSize,authorname:string){
    let params = getPaginationHeaders(pageNumber,pageSize);
    params = params.append('authorName',authorname);
    return getPaginatedResult<Partial<ShowStory[]>>(this.baseUrl+'showstory/GetStoryAuthor/',params,this.http);
  }
  getUserLiked(storyId:number){
    return this.http.get(this.baseUrl+'likestories/'+storyId,{})
  }

  deletHistoryUser(storyId:number){
    return this.http.delete(this.baseUrl+'HistoryUser/'+storyId,{});
  }
  deleteStoryLike(storyId:number){
    return this.http.delete(this.baseUrl+'LikeStories/'+storyId,{});
  }
}