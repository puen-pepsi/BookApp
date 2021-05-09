import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Story } from 'src/app/_models/story.model';
import { StoryService } from 'src/app/_services/story.service';

@Component({
  selector: 'app-story-form',
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.css']
})
export class StoryFormComponent implements OnInit {
  GenreList : any=[];
  constructor(public storyService:StoryService,
    private fb:FormBuilder) { }
  ngOnInit(): void {
    this.getGenreList();
  }


  onSubmit(form:NgForm) {
    console.log(form);
    if(this.storyService.formData.id == 0) //we will use the id as identifier for updating or insertion
    this.insertRecord(form);
    else
    this.updateRecord(form);
  }
  insertRecord(form:NgForm) {
    this.storyService.postStory().subscribe(
      res => {
        this.resetForm(form);
        this.storyService.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }
  updateRecord(form: NgForm) {
    this.storyService.putStory().subscribe(
      res => {
        this.resetForm(form);
        this.storyService.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }
  resetForm(form: NgForm) {
      form.form.reset();
      this.storyService.formData = new Story();
  }
  getGenreList(){
    this.storyService.getAllGenre().subscribe(res =>{
      this.GenreList=res;
    });
  }
  
}
