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
    return this.http.post(this.baseUrl + 'story/'+ this.storyService.formData.storyId + '/chapter/'+ pub ,this.formData);
  }
  putStoryChapter(pub:boolean){
    return this.http.put(this.baseUrl + 'story/'+ this.storyService.formData.storyId + '/chapter/'+this.formData.id+'/'+pub, this.formData);
  }
  // deleteStory(id:number){
  //   return this.http.delete(this.baseUrl + 'story/' + id);
  // }
  putPublish(id:number){
    return this.http.put(this.baseUrl +'story/'+ this.storyService.formData.storyId + '/chapter/published/' +id,null,{ responseType: 'text' });
  }
  putChapterUp(order:number){
    return this.http.put(this.baseUrl +'story/'+ this.storyService.formData.storyId + '/chapter/Up/' +order,null,{ responseType: 'text' });
  }
  putChapterDown(order:number){
    
    return this.http.put(this.baseUrl +'story/'+ this.storyService.formData.storyId + '/chapter/Down/'+order,null,{ responseType: 'text' });
      
  }
  refreshList(storyId:number,published:boolean) {
    // this.formData
    this.http.get(this.baseUrl + 'story/'+ storyId +'/chapter/GetChapters/'+published)
      .toPromise()
      .then(res => this.list = res as Chapter[]);

  }
}
