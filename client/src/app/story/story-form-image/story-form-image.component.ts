import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { env } from 'process';
import { PhotoService } from 'src/app/_services/photo.service';
import { StoryService } from 'src/app/_services/story.service';
import { UploadImageService } from 'src/app/_services/upload-image.service';
import { environment } from 'src/environments/environment';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-story-form-image',
  templateUrl: './story-form-image.component.html',
  styleUrls: ['./story-form-image.component.scss']
})
export class StoryFormImageComponent implements OnInit,OnDestroy{
  @Input() image:string;
  @Input() upload:boolean;
  @Output() pathImage = new EventEmitter();
  @ViewChild('fileInput') fileInput:ElementRef;
  baseUrl = environment.apiUrl;
  ResoucreUrl = environment.resourceUrl;
  public progress: number;
  public message: string;
  imageUrl:string = "../../assets/images/default.jpeg"
  fileToUpload: File = null;
  constructor(
      public storyService:StoryService,
      private uploadImage:UploadImageService,
      private http:HttpClient) {}
  // ngOnChanges(changes: SimpleChanges): void {
  //   if(this.upload){
  //     // this.UploadImage(this.fileToUpload,this.storyService.formData.storyId);
  //     this.uploadImage.UploadImage(this.fileToUpload,this.storyService.formData.storyId)
  //     .subscribe(event => {
  //       if (event.type === HttpEventType.UploadProgress)
  //         this.progress = Math.round(100 * event.loaded / event.total);
  //       else if (event.type === HttpEventType.Response) {
  //            this.pathImage.emit(event.body);
  //       }
  //     });
  //   }
  // }
  ngOnDestroy(): void {
    this.image = "";
  }
  ngOnInit(): void {
      // this.image = this.baseUrl + this.storyService.formData.imageUrl;
  }
  handleFileInput(file:FileList){
    this.fileToUpload = file.item(0);
    //show image preview
    var reader = new FileReader();
    reader.onload = (event:any)=>{
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    //this.imageChange.emit(this.fileToUpload);
  }
  
  // ngOnChanges(changes: SimpleChanges): void {
  //   if(!changes['image'].currentValue){
  //     this.image = "/assets/images/no-image.jpeg"
  //   }
  // }
  // UploadImage(e){
  //   const file = (e.target as HTMLInputElement).files[0];
  //   // this.imageChange.emit(file);
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.image = reader.result as string;
      
  //   }
  //   reader.readAsDataURL(file)
  //   // var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
  //   // var file = nativeElement.files[0];
  //   // nativeElement.value = ''; 

  // }
  CreateImage(serverPath:string,storyId:number){
    if(serverPath){
      if(storyId == 0){
         return this.ResoucreUrl + serverPath;
      }else {
         return  serverPath;
      }
    }
    return './assets/images/blackcover.png';
  }

  public UploadImage(files,id:number){
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    if(id == 0){
      this.http.post(this.baseUrl + 'story/photos/150/180', formData, {reportProgress: true, observe: 'events'})
            .subscribe(event => {
              if (event.type === HttpEventType.UploadProgress)
                this.progress = Math.round(100 * event.loaded / event.total);
              else if (event.type === HttpEventType.Response) {
                this.pathImage.emit(event.body);
              }
            });
    }else{
      this.http.put(this.baseUrl + 'story/photos/'+id+'/150/180', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.pathImage.emit(event.body);
        }
      });
    } 
  }
}
