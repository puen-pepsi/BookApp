import { Component, EventEmitter, Input, OnInit, Output,ChangeDetectionStrategy } from '@angular/core';
import { ShowHistory } from 'src/app/_models/ShowHIstory';
import { UserLiked } from 'src/app/_models/userLiked';
import { ShowStoryService } from '../../show-story.service';
import { StarRatingColor } from '../../star-rating/star-rating-show/star-rating-show.component';

@Component({
  selector: 'app-history-card',
  templateUrl: './history-card.component.html',
  styleUrls: ['./history-card.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HistoryCardComponent implements OnInit {
  @Input('history') history:ShowHistory;
  @Output() deleteId = new EventEmitter();
  rating:number=0;
  starColor:StarRatingColor = StarRatingColor.gold3;
  fSize : string = "1.2rem";
  starCount:number = 5;
  totalRate:number;
  yourRate:any;
  userLiked:UserLiked;
  constructor(public showStoryService:ShowStoryService) { }

  ngOnInit(): void {
    this.rating = this.history.rating;
    this.totalRate = this.history.totalRate;
    // this.showStoryService.getYouRate(this.story.storyId).subscribe(res => {
    //   this.yourRate = res;
    // });
    this.showStoryService.getUserLiked(this.history.storyId).subscribe(res =>{
      this.userLiked = res;
    });
  }

  // createSynopsis(content:string){
  //   return content.substr(0,180)+".....";
  // }
  deleteHistory(storyId:number){
    this.deleteId.emit(storyId);
  }
}
