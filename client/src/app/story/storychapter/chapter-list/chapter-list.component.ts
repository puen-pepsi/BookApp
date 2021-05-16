import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Chapter } from 'src/app/_models/chapter';
import { StoryService } from 'src/app/_services/story.service';
import { StorychapterService } from 'src/app/_services/storychapter.service';

@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.css']
})
export class ChapterListComponent implements OnInit {
  @Output() goForm = new EventEmitter;
  constructor(public storyChapterService:StorychapterService,
      public storyService:StoryService) { }

  ngOnInit(): void {
      this.storyChapterService.refreshList(this.storyService.formData.id);
  }
  populateForm(selectedRecord: Chapter) {

    this.storyChapterService.formData = Object.assign({},selectedRecord);
    //console.log(this.storyChapterService.formData);
    this.goForm.emit(true);

  }
  chapterUp(selectedRow:Chapter){
    // this.storyChapterService.formData = Object.assign({},selectedRow);
    this.storyChapterService.putChapterUp(selectedRow.order).subscribe(
      res=>{
        console.log(res);
        this.storyChapterService.refreshList(this.storyService.formData.id);
      },
      err=>{
        console.log(err);
      }
      
    );
  }
  chapterDown(selectedRow:Chapter){
    // this.storyChapterService.formData = Object.assign({},selectedRow);
    this.storyChapterService.putChapterDown(selectedRow.order).subscribe(
      res=>{
        console.log(res);
        this.storyChapterService.refreshList(this.storyService.formData.id);
      },
      err=>{
        console.log(err);
      }
    )
  }
}
