import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { formatArrayBuffer } from '@microsoft/signalr/dist/esm/Utils';
import { Chapter } from 'src/app/_models/chapter.model';
import { StoryService } from 'src/app/_services/story.service';
import { StorychapterService } from 'src/app/_services/storychapter.service';

@Component({
  selector: 'app-chapter-form',
  templateUrl: './chapter-form.component.html',
  styleUrls: ['./chapter-form.component.css']
})
export class ChapterFormComponent implements OnInit {
  @Output() goList = new EventEmitter();
  constructor(public storyChapterService:StorychapterService,
              public storyService:StoryService) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm) {
    // console.log(form);
    if(this.storyChapterService.formData.id == 0) //we will use the id as identifier for updating or insertion
    this.insertRecord(form);
    else
    this.updateRecord(form);
  }
  insertRecord(form:NgForm) {
    this.storyChapterService.postStoryChapter().subscribe(
      res => {
        console.log(res);
        this.resetForm(form);
        this.storyChapterService.refreshList(this.storyService.formData.id);
        this.goList.emit(false);
      },
      err => {
        console.log(err);
      }
    );
  }
  updateRecord(form: NgForm) {
    this.storyChapterService.putStoryChapter().subscribe(
      res => {
        this.resetForm(form);
        this.storyChapterService.refreshList(this.storyService.formData.id);
        this.goList.emit(false);
      },
      err => {
        console.log(err);
      }
    );
  }
  resetForm(form: NgForm) {
    form.form.reset();
    this.storyChapterService.formData = new Chapter();
  }
  backToChapter(){
    this.storyChapterService.formData = new Chapter();
    this.goList.emit(false);
  }
}
