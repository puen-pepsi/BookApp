import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, NgForm } from '@angular/forms';
import { ReportTopic } from 'src/app/_models/reporttopic';
import { ReporttopicService } from 'src/app/_services/reporttopic.service';

@Component({
  selector: 'app-reporttopic-form',
  templateUrl: './reporttopic-form.component.html',
  styleUrls: ['./reporttopic-form.component.scss']
})
export class ReporttopicFormComponent implements OnInit {
  constructor(public reportTopicService :ReporttopicService,
    private fb:UntypedFormBuilder) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm) {
    if(this.reportTopicService.formData.id == 0) //we will use the id as identifier for updating or insertion
    this.insertRecord(form);
    else
    this.updateRecord(form);
  }
  insertRecord(form:NgForm) {
    this.reportTopicService.postTags().subscribe(
      res => {
        this.resetForm(form);
        this.reportTopicService.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }
  updateRecord(form: NgForm) {
    this.reportTopicService.putTags().subscribe(
      res => {
        this.resetForm(form);
        this.reportTopicService.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }
  resetForm(form: NgForm) {
      form.form.reset();
      this.reportTopicService.formData = new ReportTopic();
  }

}
