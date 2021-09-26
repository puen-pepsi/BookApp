import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NewsService } from 'src/app/_services/news.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-news-image',
  templateUrl: './news-image.component.html',
  styleUrls: ['./news-image.component.scss']
})
export class NewsImageComponent implements OnInit {
  @Input() image:string;
  @Output() imageChange = new EventEmitter();
  @ViewChild('fileInput') fileInput:ElementRef;
  baseUrl = environment.apiUrl;
  ResoucreUrl = environment.resourceUrl;
  public progress: number;
  public message: string;
  constructor(
      public newsService:NewsService,
      private http:HttpClient) {}

  ngOnInit(): void {
      // this.image = this.baseUrl + this.storyService.formData.imageUrl;
  }
  CreateImage(serverPath:string,id:number){
    if(serverPath){
      if(id == 0){
         return this.ResoucreUrl + serverPath;
      }else {
         return serverPath;
      }
    }
    return './assets/images/blackcover.png';
  }
  public UploadImage = (files,id:number) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    if(id == 0){
      this.http.post(this.baseUrl + 'story/photos/420/300', formData, {reportProgress: true, observe: 'events'})
            .subscribe(event => {
              if (event.type === HttpEventType.UploadProgress)
                this.progress = Math.round(100 * event.loaded / event.total);
              else if (event.type === HttpEventType.Response) {
                this.imageChange.emit(event.body);
              }
            });
    }else{
      this.http.put(this.baseUrl + 'story/photos/'+id+'/420/300', formData, {reportProgress: true, observe: 'events'})
          .subscribe(event => {
            if (event.type === HttpEventType.UploadProgress)
              this.progress = Math.round(100 * event.loaded / event.total);
            else if (event.type === HttpEventType.Response) {
              this.imageChange.emit(event.body);
            }
          });
    } 
  }
  ngOnDestroy(): void {
    this.image = "";
  }
}
