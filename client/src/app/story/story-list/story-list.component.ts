import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Story } from 'src/app/_models/story.model';
import { StoryService } from 'src/app/_services/story.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit {
  @Output()  StoryDetail = new EventEmitter();
  @Output()  StoryId = new EventEmitter();
  baseUrl = environment.resourceUrl;
  constructor(public storyService:StoryService) { }

  ngOnInit(): void {
    this.storyService.refreshList();
  }
  ChangeForm(){
    this.StoryDetail.emit(true);
  }
  populateForm(selectedRecord: Story) {
    this.storyService.formData = Object.assign({},selectedRecord);
    this.StoryDetail.emit(true);
  }
  // public createImagePath = (serverPath: string) => {
  //   if(serverPath){
  //     return this.baseUrl + serverPath;
  //   }
  //   return `https://rainobunew.azurewebsites.net/assets/images/BlackCover.png`;
    
  // }
}
