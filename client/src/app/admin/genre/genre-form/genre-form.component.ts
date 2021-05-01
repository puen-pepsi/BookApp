import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Genres } from 'src/app/_models/genre';
import { GenreService } from 'src/app/_services/genre.service';

@Component({
  selector: 'app-genre-form',
  templateUrl: './genre-form.component.html',
  styleUrls: ['./genre-form.component.css']
})
export class GenreFormComponent implements OnInit {
  constructor(public genreService:GenreService,
      private toastr:ToastrService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm) {
    if(this.genreService.formData.id == 0) //we will use the id as identifier for updating or insertion
    this.insertRecord(form);
    else
    this.updateRecord(form);
  }
  insertRecord(form:NgForm) {
    this.genreService.postGenre().subscribe(
      res => {
        this.resetForm(form);
        this.genreService.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }
  updateRecord(form: NgForm) {
    this.genreService.putGenre().subscribe(
      res => {
        this.resetForm(form);
        this.genreService.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }
  resetForm(form: NgForm) {
      form.form.reset();
      this.genreService.formData = new Genres();
  }
}
