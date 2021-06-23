import { R } from '@angular/cdk/keycodes';
import { convertMetaToOutput } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { ShowStoryService } from 'src/app/show-story/show-story.service';
import { Pagination } from 'src/app/_models/pagination';
import { ShowHistory } from 'src/app/_models/ShowHIstory';
import { StarRatingColor } from '../../star-rating/star-rating-show/star-rating-show.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  storyHistory : Partial<ShowHistory[]>;
  // predicate = 'liked';
  pageNumber = 1;
  pageSize = 3;
  pagination:Pagination;
  rating:number=0;
  starColor:StarRatingColor = StarRatingColor.gold3;
  fSize : string = "1.2rem";
  starCount:number = 5;
  constructor(public showStoryService:ShowStoryService) { 
  }

  ngOnInit(): void {
    this.loadStoryHistory();
  }
  loadStoryHistory(){
    this.showStoryService.getStoryHistory(this.pageNumber,this.pageSize).subscribe(response =>{
      this.storyHistory = response.result;
      this.pagination = response.pagination;
    })

    // console.log(this.storyHistory.find(res => res.storyId == 1));
  }
  pageChanged(event:any){
    // this.pageNumber = event.page;
    this.pageNumber = event.pageIndex+1;
    this.loadStoryHistory();
  }
  createSynopsis(content:string){
    return content.substr(0,200)+".....";
  }
  deleteHistory(storyId:number){
    this.showStoryService.deletHistoryUser(storyId).subscribe(() =>{
      this.loadStoryHistory();
    })
  }
}
