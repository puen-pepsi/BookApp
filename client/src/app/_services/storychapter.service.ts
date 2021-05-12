import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Chapter } from '../_models/chapter';
import { StoryService } from './story.service';

@Injectable({
  providedIn: 'root'
})
export class StorychapterService {
  baseUrl = environment.apiUrl;
  formData : Chapter = new Chapter() ;
  list : Chapter[];
  constructor(private http:HttpClient,
            public storyService:StoryService) { }
  
  postStoryChapter(){
    return this.http.post(this.baseUrl + 'story/'+ this.storyService.formData.id + '/chapter' ,this.formData);
  }
  putStoryChapter(){
    return this.http.put(this.baseUrl + 'story/'+ this.storyService.formData.id + '/chapter/'+this.formData.id, this.formData);
  }
  // deleteStory(id:number){
  //   return this.http.delete(this.baseUrl + 'story/' + id);
  // }
  refreshList(storyId:number) {
    this.formData
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
