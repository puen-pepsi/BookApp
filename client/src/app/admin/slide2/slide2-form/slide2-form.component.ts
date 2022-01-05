import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Slide } from 'src/app/_models/slide.model';
import { Slide2Service } from 'src/app/_services/slide2.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-slide2-form',
  templateUrl: './slide2-form.component.html',
  styleUrls: ['./slide2-form.component.scss']
})
export class Slide2FormComponent implements OnInit {
  response:{dbPath:''};
  ResoucreUrl = environment.resourceUrl;

  constructor(
              public slide2Service:Slide2Service,
              private route : ActivatedRoute,
              private router : Router,
              private toastr:ToastrService) { }

  ngOnInit(): void {
    if(this.route.snapshot.data.slide2type == "create"){
      this.slide2Service.formData = new Slide();
    };
  }
  onSubmit(form:NgForm) {
    console.log(form);
    if(this.slide2Service.formData.id == 0) //we will use the id as identifier for updating or insertion
    this.insertRecord(form);
    else
    this.updateRecord(form);
  }
  uploadFinished = (event) =>{
    
    this.response = event;
    this.slide2Service.formData.url = this.ResoucreUrl + this.response.dbPath;
  }
  insertRecord(form:NgForm) {
    this.slide2Service.postphotoslide().subscribe(
      res => {
        // console.log(res);
        // this.photoSevice.upload()
        this.resetForm(form);
        this.router.navigate(['admin/slide2']);
      },
      err => {
        console.log(err);
      }
    );
  }
  updateRecord(form: NgForm) {
    this.slide2Service.putphotoslide().subscribe(
      res => {
        this.resetForm(form);
        this.slide2Service.refreshList();
        this.router.navigate(['admin/slide2']);
        this.toastr.success("Edit Photo slide Success","Information")
      },
      err => {
        console.log(err);
      }
    );
  }
  returnToSlideList(){
    this.router.navigate(['admin/slide2']);
  }
  resetForm(form: NgForm) {
    form.form.reset();
    this.slide2Service.formData = new Slide();
  }

}
