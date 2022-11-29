import { Component, OnInit, ViewChild } from '@angular/core';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShowStoryService } from '../show-story.service';
import { Pagination } from '../../_models/pagination';
import { ShowStory } from '../../_models/showstory';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  @ViewChild('Library',{static:true}) libraryTab:TabsetComponent;
  storylikes : Partial<ShowStory[]>;
  activeTab:TabDirective;
  // predicate = 'liked';
  pageNumber = 1;
  pageSize = 50;
  pagination:Pagination;
  constructor(private showstoryService:ShowStoryService) { 
  }

  ngOnInit(): void {
    this.loadStoryLikes();

  }
  loadStoryLikes(){
    this.showstoryService.getStoryLikes(this.pageNumber,this.pageSize).subscribe(response =>{
      this.storylikes = response.result;
      this.pagination = response.pagination;
    })
  }
  pageChanged(event:any){
    // this.pageNumber = event.page;
    this.pageNumber = event.pageIndex+1;
    this.loadStoryLikes();
  }
  pageNext(){
    // console.log("next")
    //this.showStoryService.setStoryParams(this.storyParams);
    
    if(this.pageNumber + 1 > this.pagination.totalPages)return;
    this.pageNumber++;
    this.loadStoryLikes();
  }
  pagePrevios(){
    // console.log("previos")
    //this.showStoryService.setStoryParams(this.storyParams);
    
    if(this.pageNumber -1 < 1)return;
    this.pageNumber--;
    this.loadStoryLikes();
  }
  removeStory(event:ShowStory){
    this.storylikes = this.storylikes.filter(x => x.storyId != event.storyId)
  }

  onTabActivated(data: TabDirective){
    this.activeTab = data;
    // if(this.activeTab.heading==='History'){
    //   this.showStoryService.getStoryNameChapter(this.storyName).subscribe(res =>{
    //     this.chapterList = res;
    //   });
    // }
    // if(this.activeTab.heading==='Comments' && this.comments.length === 0){
    //   this.commentService.createHubConnection(this.user,this.storyName);
    // }else{
    //   this.commentService.stopHubConnection();
    // }
  }
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    
  }
}
