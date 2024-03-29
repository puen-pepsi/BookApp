import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, pipe } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { MemberLike } from '../_models/memberlike';
import { PaginatedResult, Pagination } from '../_models/pagination';
import { User } from '../_models/user';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';



@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();
  user:User;
  userParams:UserParams;
  constructor(private http:HttpClient,private accountService:AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user =>{
      this.user = user;
      // this.userParams = new UserParams(user);
    })
   }

  getUserParams(){
    return this.userParams = new UserParams(this.user);
  }

  setUserParams(params: UserParams){
    this.userParams = params;
  }
  resetUserParams(){
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }
  getMembers(UserParams: UserParams){
    var response =this.memberCache.get(Object.values(UserParams).join('-'));
    // console.log(response);
    if(response){
      return of(response);
    }

    let params =  getPaginationHeaders(UserParams.pageNumber,UserParams.pageSize);

    params = params.append('minAge',UserParams.minAge.toString());
    params = params.append('maxAge',UserParams.maxAge.toString());
    params = params.append('gender',UserParams.gender);
    params = params.append('orderBy',UserParams.orderBy);
    // console.log(params);
    return getPaginatedResult<Member[]>(this.baseUrl+'users',params,this.http)
      .pipe(map(response =>{
        this.memberCache.set(Object.values(UserParams).join('-'),response);
        // console.log(this.memberCache.values());
        return response;
      }))
  }
 
  getMember(username:string){
    // const member = this.members.find(x=>x.username === username);
    // if(member !== undefined) return of(member);
    const member = [...this.memberCache.values()]
      .reduce((arr,elem)=> arr.concat(elem.result),[])
      .find((member:Member)=> member.username === username);
      // console.log(member);
      if(member){
        return of(member);
      }

    
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member:Member){
    return this.http.put(this.baseUrl+'users',member).pipe(
      map(()=> {
        const index = this.members.indexOf(member);
        this.members[index] = member;
        //console.log(member)
      })
    )
  }

  setMainPhoto(photoId:number){
    return this.http.put(this.baseUrl +'users/set-main-photo/' + photoId,{});
  }
  setMainBanner(bannerId:number){
    return this.http.put(this.baseUrl +'users/set-main-banner/' + bannerId,{});
  }
  setMainTitle(titleId:number){
    return this.http.put(this.baseUrl +'users/set-main-title/' + titleId,{});
  }
  deletePhoto(photoId:number){
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }
  deleteBanner(bannerId:number){
    return this.http.delete(this.baseUrl + 'users/delete-banner/' + bannerId);
  }
  deleteTitle(titleId:number){
    return this.http.delete(this.baseUrl + 'users/delete-title/' + titleId);
  }
  getLikes(predicate:string,pageNumber,pageSize){
    let params = getPaginationHeaders(pageNumber,pageSize);
    params = params.append('predicate',predicate);
    return getPaginatedResult<Partial<Member[]>>(this.baseUrl + 'likes',params,this.http);
  }
  getMemberLiked(memberid:number){
    return this.http.get<MemberLike>(this.baseUrl +'likes/'+memberid);
  }
  addLike(username:string){
    return this.http.post(this.baseUrl +'likes/' + username,{});
  }
  getMemberByUserName(username:string){
    return this.http.get<Member>(this.baseUrl +'users/'+username);
  }
  deletelikes(username:string){
    return this.http.delete(this.baseUrl + 'likes/'+username,{});
  }
}
