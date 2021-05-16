import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Chapter } from '../_models/chapter';
import { StoryService } from './story.service';
const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
@Injectable({
  providedIn: 'root'
})
export class StorychapterService {
  baseUrl = environment.apiUrl;
  formData : Chapter = new Chapter() ;
  list : Chapter[];
  
  constructor(private http:HttpClient,
            public storyService:StoryService) { }
  
  postStoryChapter(pub:boolean){
    return this.http.post(this.baseUrl + 'story/'+ this.storyService.formData.id + '/chapter/'+ pub ,this.formData);
  }
  putStoryChapter(pub:boolean){
    return this.http.put(this.baseUrl + 'story/'+ this.storyService.formData.id + '/chapter/'+this.formData.id+'/'+pub, this.formData);
  }
  // deleteStory(id:number){
  //   return this.http.delete(this.baseUrl + 'story/' + id);
  // }
  putChapterUp(order:number){
    return this.http.put(this.baseUrl +'story/'+ this.storyService.formData.id + '/chapter/Up/' +order,this.formData,{ responseType: 'text' });
  }
  putChapterDown(order:number){
    
    return this.http.put(this.baseUrl +'story/'+ this.storyService.formData.id + '/chapter/Down/'+order,this.formData,{ responseType: 'text' });
      
  }
  refreshList(storyId:number) {
    // this.formData
    this.http.get(this.baseUrl + 'story/'+ storyId +'/chapter')
      .toPromise()
      .then(res => this.list = res as Chapter[]);

  }
  // getAllGenre(){
  //   return this.http.get(this.baseUrl + 'story/GetAllGenre') ;
  // }
  // getAllLanguage(){
  //   return this.http.get(this.baseUrl + 'story/GetAllLanguage') ;
  // }
}
