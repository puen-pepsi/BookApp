import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { PhotoService } from 'src/app/_services/photo.service';
import { StoryService } from 'src/app/_services/story.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-story-form-image',
  templateUrl: './story-form-image.component.html',
  styleUrls: ['./story-form-image.component.css']
})
export class StoryFormImageComponent implements OnInit,OnDestroy{
  @Input() image:string;
  @Output() imageChange = new EventEmitter();

  @ViewChild('fileInput') fileInput:ElementRef;
  baseUrl = environment.resourceUrl;
  public progress: number;
  public message: string;
  constructor(private renderer:Renderer2,
     public storyService:StoryService,
      private photoService:PhotoService,
      private http:HttpClient) {}
  ngOnDestroy(): void {
    this.image = "";
  }
  ngOnInit(): void {
      // this.image = this.baseUrl + this.storyService.formData.imageUrl;
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
  CreateImage(serverPath:string){
    if(serverPath){
      return this.baseUrl + serverPath;
    }
    return `/assets/images/no-image.jpeg`;
  }
  public UploadImage = (files) => {
    if (files.length === 0) {
      return;
    }
    
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post('https://localhost:5001/api/story/photos', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.imageChange.emit(event.body);
        }
      });
    
  }
}
