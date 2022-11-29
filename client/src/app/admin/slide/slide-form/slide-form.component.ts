import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Slide } from 'src/app/_models/slide.model';
import { SlideService } from 'src/app/_services/slide.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-slide-form',
  templateUrl: './slide-form.component.html',
  styleUrls: ['./slide-form.component.scss']
})
export class SlideFormComponent implements OnInit {
  response:{dbPath:''};
  ResoucreUrl = environment.resourceUrl;

  constructor(
              public slideService:SlideService,
              private route : ActivatedRoute,
              private router : Router,
              private toastr:ToastrService) { }

  ngOnInit(): void {
    if(this.route.snapshot.data.slidetype == "create"){
      this.slideService.formData = new Slide();
    };
  }
  onSubmit(form:NgForm) {
    //console.log(form);
    if(this.slideService.formData.id == 0) //we will use the id as identifier for updating or insertion
    this.insertRecord(form);
    else
    this.updateRecord(form);
  }
  uploadFinished = (event) =>{
    
    this.response = event;
    this.slideService.formData.url = this.ResoucreUrl + this.response.dbPath;
  }
  insertRecord(form:NgForm) {
    this.slideService.postphotoslide().subscribe(
      res => {
        // console.log(res);
        // this.photoSevice.upload()
        this.resetForm(form);
        this.router.navigate(['admin/slide']);
      },
      err => {
        console.log(err);
      }
    );
  }
  updateRecord(form: NgForm) {
    this.slideService.putphotoslide().subscribe(
      res => {
        this.resetForm(form);
        this.slideService.refreshList();
        this.router.navigate(['admin/slide']);
        this.toastr.success("Edit Photo slide Success","Information")
      },
      err => {
        console.log(err);
      }
    );
  }
  returnToSlideList(){
    this.router.navigate(['admin/slide']);

  }
  resetForm(form: NgForm) {
    form.form.reset();
    this.slideService.formData = new Slide();
  }


}
