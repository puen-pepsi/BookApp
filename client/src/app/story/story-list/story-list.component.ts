import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Story } from 'src/app/_models/story.model';
import { StoryService } from 'src/app/_services/story.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StoryListComponent implements OnInit {
  @Output()  StoryDetail = new EventEmitter();
  @Output()  StoryId = new EventEmitter();
  displayedColumns: string[] = ['imageUrl','storyName','type','chapters',
                                'getState','rating','views','actions'];
  baseUrl = environment.resourceUrl;
  constructor(public storyService:StoryService,
              private router:Router) { }

  ngOnInit(): void {
    this.storyService.refreshList();
  }
  ChangeForm(){
    //this.StoryDetail.emit(true);
    this.router.navigate(['mystory/create']);
  }
  populateForm(selectedRecord: Story) {
    this.storyService.formData = Object.assign({},selectedRecord);
    //this.StoryDetail.emit(true);
    this.router.navigate(['mystory/edit' , this.storyService.formData.storyName])
    
  }
  // public createImagePath = (serverPath: string) => {
  //   if(serverPath){
  //     return this.baseUrl + serverPath;
  //   }
  //   return `https://rainobunew.azurewebsites.net/assets/images/BlackCover.png`;
    
  // }
}
