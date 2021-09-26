import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Activities } from '../_models/activities';

@Injectable({
  providedIn: 'root'
}) 
export class ActivitiesService {
  baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  postActivities(type:number,storyname:string){
    return this.http.post(this.baseUrl + 'activities/'+storyname,{type});
  }
  getActivities(){
    return this.http.get<Activities[]>(this.baseUrl + 'activities');
  }
  postTitle(type:number,appUserId:number,name:string){
    return this.http.post(this.baseUrl + 'title/' + name,{type,appUserId});
  }

  GetTitle(type:number){
    return this.http.get(this.baseUrl + 'title/'+ type);
  }
}
