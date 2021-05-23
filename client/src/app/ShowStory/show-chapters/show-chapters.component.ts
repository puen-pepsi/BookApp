import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chapter } from 'src/app/_models/chapter';
import { ShowstoryService } from 'src/app/_services/showstory.service';

@Component({
  selector: 'app-show-chapters',
  templateUrl: './show-chapters.component.html',
  styleUrls: ['./show-chapters.component.css']
})
export class ShowChaptersComponent implements OnInit {
  @Input() storyId : number;
  constructor(public showstoryService:ShowstoryService) { }

  ngOnInit(): void {
    this.showstoryService.getStoryChapter(this.storyId,true);
  }

}
