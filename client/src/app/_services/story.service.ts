import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Story } from '../_models/story.model';
import { Tags } from '../_models/tag';


@Injectable({
  providedIn: 'root'
})
export class StoryService {
  baseUrl = environment.apiUrl;
  formData : Story = new Story() ;
  list : Story[]=[];
  public progress: number;
  public message: string;

  constructor(private http:HttpClient) { }
  postStory(){
    return this.http.post(this.baseUrl + 'story',this.formData);
  }
  putStory(){
    return this.http.put(this.baseUrl + 'story/'+ this.formData.storyId, this.formData);
  }
  deleteStory(id:number){
    return this.http.delete(this.baseUrl + 'story/' + id);
  }
  refreshList() {
    // this.formData
    this.http.get(this.baseUrl + 'story')
      .toPromise()
      .then(res => this.list = res as Story[]);
  }
  getAllGenre(){
    return this.http.get(this.baseUrl + 'story/GetAllGenre') ;
  }
  getAllLanguage(){
    return this.http.get(this.baseUrl + 'story/GetAllLanguage');
  }
  getAllState(){
    return this.http.get(this.baseUrl + 'story/GetAllState');
  }
  getAllTags(){
    return this.http.get<Tags[]>(this.baseUrl + 'story/GetAllTags');
  }
  uploadImage(fileToUpload:File,id:number){
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    if(id == 0){
        return this.http.post(this.baseUrl + 'story/photos', formData, {reportProgress: true, observe: 'events'});
              // .subscribe(event => {
              //   if (event.type === HttpEventType.UploadProgress)
              //     this.progress = Math.round(100 * event.loaded / event.total);
              //   else if (event.type === HttpEventType.Response) {
              //         return event.body;
              //   }
              // });
    }else{
       return this.http.put(this.baseUrl + 'story/photos/'+id, formData, {reportProgress: true, observe: 'events'});
            // .subscribe(event => {
            //   if (event.type === HttpEventType.UploadProgress)
            //     this.progress = Math.round(100 * event.loaded / event.total);
            //   else if (event.type === HttpEventType.Response) {
            //     return event.body;
            //   }
            // });
    } 
  }
}
