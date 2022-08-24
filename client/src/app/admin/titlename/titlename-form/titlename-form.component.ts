import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, NgForm } from '@angular/forms';
import { ActivitiesType } from 'src/app/_models/activitiestype';
import { TitleName } from 'src/app/_models/titlename.model';
import { TitlenameService } from 'src/app/_services/titlename.service';

@Component({
  selector: 'app-titlename-form',
  templateUrl: './titlename-form.component.html',
  styleUrls: ['./titlename-form.component.scss']
})
export class TitlenameFormComponent implements OnInit {
    activitiesType = ActivitiesType;
    enumKeys=[];
  constructor(public titlenameService :TitlenameService,
    private fb:UntypedFormBuilder) { 
        this.enumKeys=Object.keys(this.activitiesType).filter(f => !isNaN(Number(f)));
      }

  ngOnInit(): void {
  }
  // change(value: string) {
  //   this.titlenameService.formData.type = this.activitiesType[value];
  // }
  onSubmit(form:NgForm) {
    if(this.titlenameService.formData.id == 0) //we will use the id as identifier for updating or insertion
    this.insertRecord(form);
    else
    this.updateRecord(form);
  }
  insertRecord(form:NgForm) {
    this.titlenameService.posttitlename().subscribe(
      res => {
        this.resetForm(form);
        this.titlenameService.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }
  updateRecord(form: NgForm) {
    this.titlenameService.puttitlename().subscribe(
      res => {
        this.resetForm(form);
        this.titlenameService.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }
  resetForm(form: NgForm) {
      form.form.reset();
      this.titlenameService.formData = new TitleName();
  }
}
