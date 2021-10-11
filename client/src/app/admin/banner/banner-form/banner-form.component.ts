import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Slide } from 'src/app/_models/slide.model';
import { BannerService } from 'src/app/_services/banner.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-banner-form',
  templateUrl: './banner-form.component.html',
  styleUrls: ['./banner-form.component.scss']
})
export class BannerFormComponent implements OnInit {
  response:{dbPath:''};
  ResoucreUrl = environment.resourceUrl;

  constructor(
              public bannerService:BannerService,
              private route : ActivatedRoute,
              private router : Router,
              private toastr:ToastrService) { }

  ngOnInit(): void {
    if(this.route.snapshot.data.bannertype == "create"){
      this.bannerService.formData = new Slide();
    };
  }
  onSubmit(form:NgForm) {
    console.log(form);
    if(this.bannerService.formData.id == 0) //we will use the id as identifier for updating or insertion
    this.insertRecord(form);
    else
    this.updateRecord(form);
  }
  uploadFinished = (event) =>{
    
    this.response = event;
    this.bannerService.formData.url = this.ResoucreUrl + this.response.dbPath;
  }
  insertRecord(form:NgForm) {
    this.bannerService.postphotobanner().subscribe(
      res => {
        // console.log(res);
        // this.photoSevice.upload()
        this.resetForm(form);
        this.router.navigate(['banner']);
      },
      err => {
        console.log(err);
      }
    );
  }
  updateRecord(form: NgForm) {
    this.bannerService.putphotobanner().subscribe(
      res => {
        this.resetForm(form);
        this.bannerService.refreshList();
        this.router.navigate(['admin/banner']);
        this.toastr.success("Edit Photo banner Success","Information")
      },
      err => {
        console.log(err);
      }
    );
  }
  returnToSlideList(){
    this.router.navigate(['admin/banner']);

  }
  resetForm(form: NgForm) {
    form.form.reset();
    this.bannerService.formData = new Slide();
  }

}
