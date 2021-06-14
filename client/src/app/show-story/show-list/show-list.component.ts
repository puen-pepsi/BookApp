import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/_models/pagination';
import { ShowStory } from 'src/app/_models/showstory';
import { StoryParams } from 'src/app/_models/storyParams';
import { ShowStoryService } from '../show-story.service';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent implements OnInit {
  showstory : ShowStory[];
  GenreList : any=[];
  pagination :Pagination;
  storyParams : StoryParams;
  
  constructor(private showStoryService:ShowStoryService) { 
    this.storyParams = this.showStoryService.getStoryParams();
  }

  ngOnInit(): void {
      this.getGenreList();
      this.loadStory();
  }
  loadStory(){
    this.showStoryService.setStoryParams(this.storyParams);
    this.showStoryService.getShowStory(this.storyParams).subscribe(response => {
      this.showstory = response.result;
      this.pagination = response.pagination;
    });
  }
  resetFilters(){
    this.storyParams = this.showStoryService.resetStoryParams();
    this.loadStory();
  }
  pageChanged(event:any){
    this.showStoryService.setStoryParams(this.storyParams);
    this.storyParams.pageNumber = event.page;
    this.loadStory();
  }
  getGenreList(){
    this.showStoryService.getGenreList().subscribe(res =>{
      this.GenreList=res;
    });
  }
}
