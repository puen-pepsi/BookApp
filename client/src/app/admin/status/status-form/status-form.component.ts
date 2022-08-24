import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, NgForm } from '@angular/forms';
import { Status } from 'src/app/_models/status.model';
import { StatusService } from 'src/app/_services/status.service';

@Component({
  selector: 'app-status-form',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.scss']
})
export class StatusFormComponent implements OnInit {
  constructor(public statusService:StatusService,
    private fb:UntypedFormBuilder) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm) {
    if(this.statusService.formData.id == 0) //we will use the id as identifier for updating or insertion
    this.insertRecord(form);
    else
    this.updateRecord(form);
  }
  insertRecord(form:NgForm) {
    this.statusService.postStatus().subscribe(
      res => {
        this.resetForm(form);
        this.statusService.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }
  updateRecord(form: NgForm) {
    this.statusService.putStatus().subscribe(
      res => {
        this.resetForm(form);
        this.statusService.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }
  resetForm(form: NgForm) {
      form.form.reset();
      this.statusService.formData = new Status();
  }
}
