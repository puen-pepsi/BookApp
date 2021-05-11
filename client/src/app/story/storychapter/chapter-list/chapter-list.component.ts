import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chapter } from 'src/app/_models/chapter.model';
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
    console.log(selectedRecord);
    this.storyChapterService.formData = Object.assign({},selectedRecord);
    this.goForm.emit(true);

  }
}
