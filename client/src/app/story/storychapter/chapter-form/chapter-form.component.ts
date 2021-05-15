import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { formatArrayBuffer } from '@microsoft/signalr/dist/esm/Utils';
import { ToastrService } from 'ngx-toastr';
import { Chapter } from 'src/app/_models/chapter';
import { StoryService } from 'src/app/_services/story.service';
import { StorychapterService } from 'src/app/_services/storychapter.service';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import * as ClassicEditor from 'src/app/ckCustomBuild/build/ckeditor';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-chapter-form',
  templateUrl: './chapter-form.component.html',
  styleUrls: ['./chapter-form.component.css']
})
export class ChapterFormComponent implements OnInit {
  @Output() goList = new EventEmitter();
  publishCheck:boolean;
  user : User;
  public Editor = ClassicEditor;
  
  public config = {
      toolbar: [ 'undo', 'redo','|',
                'heading', '|',
                '|', 'outdent', 'indent', 
                'bold', 'italic','blockQuote','horizontalLine',
                '|','fontsize', 'fontFamily','fontColor', 'fontBackgroundColor',
                '|', 
                '|','imageUpload',],
                fontFamily: {
                  options: [
                      //'default',
                      // 'Ubuntu, Arial, sans-serif',
                      // 'Ubuntu Mono, Courier New, Courier, monospace',
                      'default',
                      'Arial, Helvetica, sans-serif',
                      'Courier New, Courier, monospace',
                      'Georgia, serif',
                      'Lucida Sans Unicode, Lucida Grande, sans-serif',
                      'Tahoma, Geneva, sans-serif',
                      'Times New Roman, Times, serif',
                      'Trebuchet MS, Helvetica, sans-serif',
                      'Verdana, Geneva, sans-serif'
                  ]
                },
                 simpleUpload: {
                  // The URL that the images are uploaded to.
                  uploadUrl: 'https://localhost:5001/api/Image',
      
                  // Enable the XMLHttpRequest.withCredentials property.
                  // withCredentials: true,
      
                  // // Headers sent along with the XMLHttpRequest to the upload server.
                  // headers: {
                  //     'X-CSRF-TOKEN': 'CSRF-Token',
                  //     Authorization: 'Bearer <JSON Web Token>'
                  // }
                },
                image:{
                   // Configure the available styles.
                    styles: [
                        'alignLeft', 'alignCenter', 'alignRight'
                    ],

                    // Configure the available image resize options.
                    resizeOptions: [
                        {
                            name: 'resizeImage:original',
                            label: 'Original',
                            value: null
                        },
                        {
                            name: 'resizeImage:50',
                            label: '50%',
                            value: '50'
                        },
                        {
                            name: 'resizeImage:75',
                            label: '75%',
                            value: '75'
                        }
                    ],

                    // You need to configure the image toolbar, too, so it shows the new style
                    // buttons as well as the resize buttons.
                    toolbar: [
                        'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
                        '|',
                        'resizeImage',
                        '|',
                        'imageTextAlternative'
                    ]
                },
                indentBlock: {
                  offset: 1,
                  unit: 'em'
              },

      // This value must be kept in sync with the language defined in webpack.config.js.
      language: 'en',
      // style:['height:500px']
      

  };
  constructor(public storyChapterService:StorychapterService,
              public storyService:StoryService,
              // private accountService:AccountService,
              private toastr:ToastrService) { 
                // this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
              }

  ngOnInit(): void {
  }
  public onChange( { editor }: ChangeEvent ) {
    this.storyChapterService.formData.content = editor.getData();

    console.log( this.storyChapterService.formData.content );
  }
  onSubmit(form:NgForm) {
    // console.log(form);
    if(this.storyChapterService.formData.id == 0) //we will use the id as identifier for updating or insertion
    this.insertRecord(form);
    else
    this.updateRecord(form);
  }
  insertRecord(form:NgForm) {
    this.storyChapterService.postStoryChapter(this.publishCheck).subscribe(
      res => {
        // console.log(res);
        this.resetForm(form);
        this.storyChapterService.refreshList(this.storyService.formData.id);
        this.goList.emit(false);
        this.toastr.success("Add Chapter Success","Infomation");

      },
      err => {
        this.toastr.error("!!!UnSuccess","Infomation");
        console.log(err);
      }
    );
  }
  updateRecord(form: NgForm) {
    this.storyChapterService.putStoryChapter(this.publishCheck).subscribe(
      res => {
        this.resetForm(form);
        this.storyChapterService.refreshList(this.storyService.formData.id);
        this.goList.emit(false);
      },
      err => {
        console.log(err);
      }
    );
  }
  resetForm(form: NgForm) {
    form.form.reset();
    this.storyChapterService.formData = new Chapter();
  }
  backToChapter(){
    this.storyChapterService.formData = new Chapter();
    this.goList.emit(false);
  }
    createPublish(chk:boolean){
      this.publishCheck = chk;
    }
}
