import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cover } from 'src/app/_models/cover.model';
import { CoverService } from 'src/app/_services/cover.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cover-form',
  templateUrl: './cover-form.component.html',
  styleUrls: ['./cover-form.component.scss']
})
export class CoverFormComponent implements OnInit {
  response:{dbPath:''};
  ResoucreUrl = environment.resourceUrl;

  constructor(
              public coverService:CoverService,
              private route : ActivatedRoute,
              private router : Router,
              private toastr:ToastrService) { }

  ngOnInit(): void {
    if(this.route.snapshot.data.covertype == "create"){
      this.coverService.formData = new Cover();
    };
  }
  
  onSubmit(form:NgForm) {
    //console.log(form);
    if(this.coverService.formData.id == 0) //we will use the id as identifier for updating or insertion
    this.insertRecord(form);
    else
    this.updateRecord(form);
  }
  uploadFinished = (event) =>{
    
    this.response = event;
    this.coverService.formData.url = this.ResoucreUrl + this.response.dbPath;
  }
  insertRecord(form:NgForm) {
    this.coverService.postphotoscreen().subscribe(
      res => {
        // console.log(res);
        // this.photoSevice.upload()
        this.resetForm(form);
        this.router.navigate(['admin/cover']);
      },
      err => {
        console.log(err);
      }
    );
  }
  updateRecord(form: NgForm) {
    this.coverService.putphotoscreen().subscribe(
      res => {
        this.resetForm(form);
        this.coverService.refreshList();
        this.router.navigate(['admin/cover']);
        this.toastr.success("Edit Photo Screen Success","Information")
      },
      err => {
        console.log(err);
      }
    );
  }
  returnToCoverList(){
    this.router.navigate(['admin/cover']);
  }
  resetForm(form: NgForm) {
    form.form.reset();
    this.coverService.formData = new Cover();
  }

}
