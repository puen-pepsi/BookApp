import { Component, OnInit } from '@angular/core';
import { ShowStoryService } from 'src/app/show-story/show-story.service';
import { Pagination } from 'src/app/_models/pagination';
import { ShowHistory } from 'src/app/_models/ShowHIstory';
import { UserLiked } from 'src/app/_models/userLiked';
import { StarRatingColor } from '../../star-rating/star-rating-show/star-rating-show.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  storyHistory : Partial<ShowHistory[]> = [];
  // predicate = 'liked';
  pageNumber = 1;
  pageSize = 10;
  pagination:Pagination;
  rating:number=0;
  starColor:StarRatingColor = StarRatingColor.gold3;
  fSize : string = "1.2rem";
  starCount:number = 5;
  userLiked:UserLiked;
  notEmptyPost = true;
  notscrolly = true;
  constructor(public showStoryService:ShowStoryService) { 
  }

  ngOnInit(): void {
    this.loadStoryHistory();
  }
  loadStoryHistory(){
    this.showStoryService.getStoryHistory(this.pageNumber,this.pageSize).subscribe(response =>{
      const newPost = response.result;
      //  this.spinner.hide();
       if (newPost.length === 0 ) {
         this.notEmptyPost =  false;
       }
       // add newly fetched posts to the existing post
      
      this.storyHistory = this.storyHistory.concat(newPost);
      this.pagination = response.pagination;//1,2,3,4..
      // console.log(this.storyHistory)
      // console.log(this.pagination)
      this.notscrolly = true;
    })
  }
    onScroll() {
      if (this.notscrolly && this.notEmptyPost) {
        // this.spinner.show();
        this.pageNumber++;
        this.notscrolly = false;
        this.loadStoryHistory();
      }
    }
    // console.log(this.storyHistory.find(res => res.storyId == 1));
  pageChanged(event:any){
    // this.pageNumber = event.page;
    this.pageNumber = event.pageIndex+1;
    this.loadStoryHistory();
  }
 
  deleteHistory(story:ShowHistory){
    this.showStoryService.deletHistoryUser(story.storyId).subscribe(() =>{
        this.storyHistory = this.storyHistory.filter(x => x.storyId != story.storyId);
    })
  }
}
