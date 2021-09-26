import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnyCnameRecord } from 'dns';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  baseUrl = environment.apiUrl;
  progress;
  constructor(private http : HttpClient) { }
    UploadImage(fileToUpload:File,id:number){
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    if(id == 0){
      return this.http.post(this.baseUrl + 'story/photos', formData, {reportProgress: true, observe: 'events'})
            // .subscribe(event => {
            //   if (event.type === HttpEventType.UploadProgress)
            //     this.progress = Math.round(100 * event.loaded / event.total);
            //   else if (event.type === HttpEventType.Response) {
            //     return(event.body);
            //   }
            // });
    }else{
      return this.http.put(this.baseUrl + 'story/photos/'+id, formData, {reportProgress: true, observe: 'events'})
      // .subscribe(event => {
      //   if (event.type === HttpEventType.UploadProgress)
      //     this.progress = Math.round(100 * event.loaded / event.total);
      //   else if (event.type === HttpEventType.Response) {
      //     return(event.body);
      //   }
      // });
    } 
  }
}
