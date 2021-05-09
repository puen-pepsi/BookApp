import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Story } from '../_models/story.model';


@Injectable({
  providedIn: 'root'
})
export class StoryService {
  baseUrl = environment.apiUrl;
  formData : Story = new Story() ;
  list : Story[];
  constructor(private http:HttpClient) { }
  postStory(){
    return this.http.post(this.baseUrl + 'story',this.formData);
  }
  putStory(){
    return this.http.put(this.baseUrl + 'story/'+ this.formData.id +'/'+'false', this.formData);
  }
  deleteStory(id:number){
    return this.http.delete(this.baseUrl + 'story/' + id);
  }
  refreshList() {
    this.http.get(this.baseUrl + 'story')
      .toPromise()
      .then(res => this.list = res as Story[]);
  }
  getAllGenre(){
    return this.http.get(this.baseUrl + 'story/GetAllGenre') ;
  }
  
}
