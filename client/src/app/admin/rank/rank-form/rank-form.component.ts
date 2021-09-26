import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Rank } from 'src/app/_models/rank.model';
import { RankService } from 'src/app/_services/rank.service';

@Component({
  selector: 'app-rank-form',
  templateUrl: './rank-form.component.html',
  styleUrls: ['./rank-form.component.scss']
})
export class RankFormComponent implements OnInit {
  constructor(public rankService :RankService,
    private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm) {
    if(this.rankService.formData.id == 0) //we will use the id as identifier for updating or insertion
    this.insertRecord(form);
    else
    this.updateRecord(form);
  }
  insertRecord(form:NgForm) {
    this.rankService.postRank().subscribe(
      res => {
        this.resetForm(form);
        this.rankService.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }
  updateRecord(form: NgForm) {
    this.rankService.putRank().subscribe(
      res => {
        this.resetForm(form);
        this.rankService.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }
  resetForm(form: NgForm) {
      form.form.reset();
      this.rankService.formData = new Rank();
  }
}
