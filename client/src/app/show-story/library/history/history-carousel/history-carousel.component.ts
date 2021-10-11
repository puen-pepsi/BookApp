import { I } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import { ShowStoryService } from 'src/app/show-story/show-story.service';
import { StarRatingColor } from 'src/app/show-story/star-rating/star-rating-show/star-rating-show.component';
import { Pagination } from 'src/app/_models/pagination';
import { ShowHistory } from 'src/app/_models/ShowHistory';
import { User } from 'src/app/_models/user';
import { UserLiked } from 'src/app/_models/userLiked';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-history-carousel',
  templateUrl: './history-carousel.component.html',
  styleUrls: ['./history-carousel.component.scss']
})
export class HistoryCarouselComponent implements OnInit {
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
  user:User;
  constructor(public showStoryService:ShowStoryService,
              private accountService:AccountService) { 
               this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user=user);
  }

  ngOnInit(): void {
    if(this.user){
       this.loadStoryHistory();
    }
   
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
      // console.log(this.pagination)
      this.notscrolly = true;
    })
  }
    onScroll() {
      if (this.notscrolly && this.notEmptyPost) {
        // this.spinner.show();
        this.pageNumber++;
        this.notscrolly = false;
        // console.log("scroll");
        this.loadStoryHistory();
      }
    }
    // console.log(this.storyHistory.find(res => res.storyId == 1));
  pageChanged(event:any){
    // this.pageNumber = event.page;
    this.pageNumber = event.pageIndex+1;
    this.loadStoryHistory();
  }
 
  deleteHistory(storyId:number){
    this.showStoryService.deletHistoryUser(storyId).subscribe(() =>{
      this.loadStoryHistory();
    })
  }
}
