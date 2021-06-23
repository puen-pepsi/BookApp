import { Component, OnInit, ViewChild } from '@angular/core';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShowStoryService } from '../show-story.service';
import { Pagination } from '../../_models/pagination';
import { ShowStory } from '../../_models/showstory';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  @ViewChild('Library',{static:true}) libraryTab:TabsetComponent;

  storylikes : Partial<ShowStory[]>;
  // predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;
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
  deleteStoryLike(event){
    this.showstoryService.deleteStoryLike(event.storyId).subscribe(()=>{
        this.loadStoryLikes();
    })
  }
  onTabActivated(data: TabDirective){
    // this.activeTab = data;
    // if(this.activeTab.heading==='Table of Contents'){
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
}
