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
  list : Chapter[] = [];
  
  constructor(private http:HttpClient,
            public storyService:StoryService) { }
  
  postStoryChapter(pub:boolean){
    return this.http.post(this.baseUrl + 'chapters/'+ this.storyService.formData.storyId + '/'+ pub ,this.formData);
  }
  putStoryChapter(pub:boolean){
    return this.http.put(this.baseUrl + 'chapters/'+ this.storyService.formData.storyId + '/'+this.formData.id+'/'+pub, this.formData);
  }
  // deleteStory(id:number){
  //   return this.http.delete(this.baseUrl + 'story/' + id);
  // }
  putPublish(id:number){
    return this.http.put(this.baseUrl +'chapters/published/'+ this.storyService.formData.storyId + '/' +id,null,{ responseType: 'text' });
  }
  putChapterUp(order:number){
    return this.http.put(this.baseUrl +'chapters/up/'+ this.storyService.formData.storyId + '/' +order,null,{ responseType: 'text' });
  }
  putChapterDown(order:number){
    
    return this.http.put(this.baseUrl +'chapters/down/'+ this.storyService.formData.storyId + '/'+order,null,{ responseType: 'text' });
      
  }
  refreshList(storyId:number,published:boolean) {
      this.http.get(this.baseUrl + 'chapters/'+storyId+'/'+published)     
      .toPromise()
      .then(res => this.list = res as Chapter[]);
  }
  getPublished(storyId:number,published:boolean){
    return this.http.get<Chapter[]>(this.baseUrl + 'chapters/'+storyId+'/'+published);
  }
  getNotPublish(storyId:number){
    return this.http.get<Chapter[]>(this.baseUrl + 'chapters/getnotpublish/'+storyId);
  }
}
