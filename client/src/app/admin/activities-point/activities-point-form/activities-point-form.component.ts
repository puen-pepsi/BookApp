import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, NgForm } from '@angular/forms';
import { ActivitiesPoint } from 'src/app/_models/activitiespoint.model';
import { ActivitiesType } from 'src/app/_models/activitiestype';
import { ActivitiesPointService } from 'src/app/_services/activities-point.service';

@Component({
  selector: 'app-activities-point-form',
  templateUrl: './activities-point-form.component.html',
  styleUrls: ['./activities-point-form.component.scss']
})
export class ActivitiesPointFormComponent implements OnInit {
  activitiesType = ActivitiesType;
    enumKeys=[];
  constructor(public activitiesService :ActivitiesPointService,
    private fb:UntypedFormBuilder) {
      this.enumKeys=Object.keys(this.activitiesType).filter(f => !isNaN(Number(f)));
     }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm) {
    if(this.activitiesService.formData.id == 0) //we will use the id as identifier for updating or insertion
    this.insertRecord(form);
    else
    this.updateRecord(form);
  }
  insertRecord(form:NgForm) {
    this.activitiesService.postActivitiesPoint().subscribe(
      res => {
        this.resetForm(form);
        this.activitiesService.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }
  updateRecord(form: NgForm) {
    this.activitiesService.putActivitiesPoint().subscribe(
      res => {
        this.resetForm(form);
        this.activitiesService.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }
  resetForm(form: NgForm) {
      form.form.reset();
      this.activitiesService.formData = new ActivitiesPoint();
  }
}
