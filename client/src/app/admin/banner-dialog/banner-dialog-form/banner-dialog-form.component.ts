import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Slide } from 'src/app/_models/slide.model';
import { BannerDialogService } from 'src/app/_services/banner-dialog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-banner-dialog-form',
  templateUrl: './banner-dialog-form.component.html',
  styleUrls: ['./banner-dialog-form.component.scss']
})
export class BannerDialogFormComponent implements OnInit {
  response:{dbPath:''};
  ResoucreUrl = environment.resourceUrl;

  constructor(
              public bannerdialogService:BannerDialogService,
              private route : ActivatedRoute,
              private router : Router,
              private toastr:ToastrService) { }

  ngOnInit(): void {
    if(this.route.snapshot.data.bannertype == "create"){
      this.bannerdialogService.formData = new Slide();
    };
  }
  onSubmit(form:NgForm) {
    console.log(form);
    if(this.bannerdialogService.formData.id == 0) //we will use the id as identifier for updating or insertion
    this.insertRecord(form);
    else
    this.updateRecord(form);
  }
  uploadFinished = (event) =>{
    
    this.response = event;
    this.bannerdialogService.formData.url = this.ResoucreUrl + this.response.dbPath;
  }
  insertRecord(form:NgForm) {
    this.bannerdialogService.postphotobannerdialog().subscribe(
      res => {
        // console.log(res);
        // this.photoSevice.upload()
        this.resetForm(form);
        this.router.navigate(['admin/bannerdialog']);
      },
      err => {
        console.log(err);
      }
    );
  }
  updateRecord(form: NgForm) {
    this.bannerdialogService.putphotobannerdialog().subscribe(
      res => {
        this.resetForm(form);
        this.bannerdialogService.refreshList();
        this.router.navigate(['admin/bannerdialog']);
        this.toastr.success("Edit Photo banner dialog Success","Information")
      },
      err => {
        console.log(err);
      }
    );
  }
  returnToSlideList(){
    this.router.navigate(['admin/bannerdialog']);

  }
  resetForm(form: NgForm) {
    form.form.reset();
    this.bannerdialogService.formData = new Slide();
  }


}
