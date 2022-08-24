import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, NgForm } from '@angular/forms';
import { Tags } from 'src/app/_models/tag';
import { TagsService } from 'src/app/_services/tags.service';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.scss']
})
export class TagFormComponent implements OnInit {
  constructor(public tagsService :TagsService,
    private fb:UntypedFormBuilder) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm) {
    if(this.tagsService.formData.id == 0) //we will use the id as identifier for updating or insertion
    this.insertRecord(form);
    else
    this.updateRecord(form);
  }
  insertRecord(form:NgForm) {
    this.tagsService.postTags().subscribe(
      res => {
        this.resetForm(form);
        this.tagsService.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }
  updateRecord(form: NgForm) {
    this.tagsService.putTags().subscribe(
      res => {
        this.resetForm(form);
        this.tagsService.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }
  resetForm(form: NgForm) {
      form.form.reset();
      this.tagsService.formData = new Tags();
  }
}
