import { Component, Input, OnInit } from '@angular/core';
import { ShowStory } from 'src/app/_models/showstory';
import { UserLiked } from 'src/app/_models/userLiked';
import { ShowStoryService } from '../../show-story.service';
import { StarRatingColor } from '../../star-rating/star-rating-show/star-rating-show.component';

@Component({
  selector: 'app-show-top-card',
  templateUrl: './show-top-card.component.html',
  styleUrls: ['./show-top-card.component.scss']
})
export class ShowTopCardComponent implements OnInit {
  @Input('topcard') topcard:ShowStory;
  rating:number=0;
  starColor:StarRatingColor = StarRatingColor.gold3;
  fSize : string = "1.2rem";
  starCount:number = 5;
  totalRate:number;
  yourRate:any;
  userLiked:UserLiked;
  constructor(public showStoryService:ShowStoryService) { }

  ngOnInit(): void {
    this.rating = this.topcard.rating;
    this.totalRate = this.topcard.totalRate;
    // this.showStoryService.getYouRate(this.story.storyId).subscribe(res => {
    //   this.yourRate = res;
    // });
    this.showStoryService.getUserLiked(this.topcard.storyId).subscribe(res =>{
      this.userLiked = res;
    });
  }
  // createSynopsis(content:string){
  //   return content.substr(0,180)+".....";
  // }

}
