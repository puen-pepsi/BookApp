import { Component, OnInit } from '@angular/core';
import { LazyLoadParams } from 'src/app/_models/lazyLoadParams';
import { Pagination } from 'src/app/_models/pagination';
import { ShowHistory } from 'src/app/_models/ShowHIstory';
import { ShowStory } from 'src/app/_models/showstory';
import { StoryParams } from 'src/app/_models/storyParams';
import { UserLiked } from 'src/app/_models/userLiked';
import { ShowStoryService } from '../show-story.service';
import { StarRatingColor } from '../star-rating/star-rating-show/star-rating-show.component';

@Component({
  selector: 'app-show-top-rank',
  templateUrl: './show-top-rank.component.html',
  styleUrls: ['./show-top-rank.component.css']
})
export class ShowTopRankComponent implements OnInit {
  storytop:Partial<ShowStory[]>;
  // predicate = 'liked';
  pageNumber = 1;
  pageSize = 3;
  pagination:Pagination;
  lazyloadParams = new LazyLoadParams;
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
    this.lazyloadParams.storyType='novel';
    this.lazyloadParams.takeSize=5;
    this.loadStorytoprank();
  }
  loadStorytoprank(){
    console.log(this.lazyloadParams)
    this.showStoryService.getShowStoryLazyLoad(this.lazyloadParams).subscribe(res =>{
        this.storytop = res;
        console.log(this.storytop)
    });
  }
}
