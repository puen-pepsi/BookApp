import { Component, Input, OnInit ,ChangeDetectionStrategy} from '@angular/core';
import { ShowStory } from 'src/app/_models/showstory';
import { ShowStoryService } from '../show-story.service';
import { StarRatingColor } from '../star-rating/star-rating-show/star-rating-show.component';

@Component({
  selector: 'app-show-top-rank',
  templateUrl: './show-top-rank.component.html',
  styleUrls: ['./show-top-rank.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ShowTopRankComponent implements OnInit {
  @Input() storytop:Partial<ShowStory[]>;
  // predicate = 'liked';

  // popStoryParams:StoryParams;
  // pagination:Pagination;

  // lazyloadParams = new LazyLoadParams;
  rating:number=0;
  starColor:StarRatingColor = StarRatingColor.gold3;
  fSize : string = "1.2rem";
  starCount:number = 5;
  // userLiked:UserLiked;
  // notEmptyPost = true;
  // notscrolly = true;


  constructor(public showStoryService:ShowStoryService) { 
      // this.popStoryParams = this.showStoryService.getStoryParams('novel');
  }

  ngOnInit(): void {
    // this.lazyloadParams.storyType='novel';
    // this.lazyloadParams.takeSize=5;
    // this.loadStorytoprank();

    // this.popStoryParams.orderBy ='views';
    // this.popStoryParams.pageSize = 5;
    // this.loadStoryTopRank();
  }
  // loadStorytoprank(){
  //   this.showStoryService.getShowStoryLazyLoad(this.lazyloadParams).subscribe(res =>{
  //       this.storytop = res;
  //   });
  // }
  
  // loadStoryTopRank(){
  //   this.showStoryService.setStoryParams(this.popStoryParams);
  //   this.showStoryService.getShowStory(this.popStoryParams).subscribe(response =>{
  //      this.storytop = response.result;
  //      this.pagination = response.pagination;
  //     //  console.log(this.storytop)
  //   })
  // }
}
