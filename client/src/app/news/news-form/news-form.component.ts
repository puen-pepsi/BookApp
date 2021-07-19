import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { News } from 'src/app/_models/news.model';
import { NewsService } from 'src/app/_services/news.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.css']
})
export class NewsFormComponent implements OnInit {
  response:{dbPath:''};
  ResoucreUrl = environment.resourceUrl;

  constructor(public newsService:NewsService,
              private router : Router,
              private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm) {
    console.log(form);
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
}
