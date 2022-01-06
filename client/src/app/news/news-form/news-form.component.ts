import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { News } from 'src/app/_models/news.model';
import { NewsService } from 'src/app/_services/news.service';
import { environment } from 'src/environments/environment';
import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import * as ClassicEditor from 'src/app/ckCustomBuild/build/ckeditor';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnInit {
  @ViewChild('editor') editorComponent:CKEditorComponent;
  response:{dbPath:''};
  ResoucreUrl = environment.resourceUrl;
  type;
  baseApiUrl = environment.apiUrl;
  public Editor = ClassicEditor;
  public EditorData = '';
  public config = {
      toolbar: [ 'undo', 'redo','|',
                'heading', '|',
                'fontColor', 'fontBackgroundColor',
                '|', 'outdent', 'indent', '|','alignment:left', 'alignment:center','alignment:right' ,
                'bold', 'italic','horizontalLine',
                '|','fontsize',
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
                  //uploadUrl: 'https://localhost:5001/api/Image',

                  uploadUrl: this.baseApiUrl + 'Image',
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

  constructor(public newsService:NewsService,
              private router : Router,
              private route : ActivatedRoute,
              private toastr:ToastrService) {
                 this.type = this.route.snapshot.data.type;
               }

  ngOnInit(): void {
    if(this.type == "create")this.newsService.formData = new News();
    if(this.type == "edit")this.EditorData = this.newsService.formData.content;
  }
  onSubmit(form:NgForm) {
    //console.log(form);
    if(this.newsService.formData.id == 0) //we will use the id as identifier for updating or insertion
    this.insertRecord(form);
    else
    this.updateRecord(form);
  }
  uploadFinished = (event) =>{

    this.response = event;
    this.newsService.formData.pictureUrl = this.ResoucreUrl + this.response.dbPath;
  }
  insertRecord(form:NgForm) {
    this.newsService.postNews().subscribe(
      res => {
        // console.log(res);
        // this.photoSevice.upload()
        this.resetForm(form);
        this.router.navigate(['news']);
      },
      err => {
        console.log(err);
      }
    );
  }
  updateRecord(form: NgForm) {
    this.newsService.putNews().subscribe(
      res => {
        this.resetForm(form);
        this.newsService.refreshList();
        this.router.navigate(['news']);
        this.toastr.success("Edit News Success","Information")
      },
      err => {
        console.log(err);
      }
    );
  }
  returnToNewsList(){
    this.router.navigate(['news']);
  }
  resetForm(form: NgForm) {
    form.form.reset();
    this.newsService.formData = new News();
  }
  public onChange( { editor }: ChangeEvent ) {
    this.newsService.formData.content = editor.getData();
  }
}
