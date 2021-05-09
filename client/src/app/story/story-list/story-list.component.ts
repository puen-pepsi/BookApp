import { Component, OnInit } from '@angular/core';
import { StoryService } from 'src/app/_services/story.service';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit {

  constructor(public storyService:StoryService) { }

  ngOnInit(): void {
    this.storyService.refreshList();
  }

}
